# Retry Logic Patterns for Network Errors

## Overview

Network operations can fail temporarily. Implementing retry logic with exponential backoff improves reliability and user experience.

## When to Retry

### ✅ Retry These Errors

- Network timeout
- 429 Too Many Requests
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
- Connection refused
- DNS lookup failed

### ❌ Don't Retry These Errors

- 400 Bad Request (invalid data)
- 401 Unauthorized (need new auth)
- 403 Forbidden (no permission)
- 404 Not Found (doesn't exist)
- 422 Unprocessable Entity (validation error)

## Implementation Patterns

### Pattern 1: Simple Retry with Fixed Delay

```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    // Check if error is retryable
    if (!isRetryableError(error)) throw error;

    // Wait before retry
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry
    return fetchWithRetry(fn, retries - 1, delay);
  }
}

// Usage
const cards = await fetchWithRetry(() =>
  supabase.from('custom_cards').select('*')
);
```

### Pattern 2: Exponential Backoff

```typescript
async function fetchWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  maxDelay: number = 10000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry if not retryable
      if (!isRetryableError(error)) throw error;

      // Don't retry on last attempt
      if (attempt === maxRetries) break;

      // Calculate delay: baseDelay * 2^attempt
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);

      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Usage
const result = await fetchWithExponentialBackoff(
  () => createCustomCardInSupabase(cardData),
  3, // Max 3 retries
  1000, // Start with 1s delay
  10000 // Max 10s delay
);
```

### Pattern 3: Exponential Backoff with Jitter

```typescript
// Adds randomness to prevent thundering herd problem
async function fetchWithJitter<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  const baseDelay = 1000;
  const maxDelay = 10000;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isRetryableError(error) || attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff with full jitter
      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, attempt),
        maxDelay
      );

      const jitter = Math.random() * exponentialDelay;

      console.log(
        `Retry ${attempt + 1}/${maxRetries} after ${Math.round(jitter)}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, jitter));
    }
  }

  throw new Error('Max retries exceeded');
}
```

### Pattern 4: Retry with User Feedback

```typescript
import { toast } from 'sonner';

async function fetchWithUserFeedback<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    onRetry?: (attempt: number) => void;
    showToast?: boolean;
  } = {}
): Promise<T> {
  const { maxRetries = 3, onRetry, showToast = true } = options;
  const baseDelay = 1000;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isRetryableError(error) || attempt === maxRetries) {
        if (showToast) {
          toast.error('Operation failed. Please try again.');
        }
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      const remainingRetries = maxRetries - attempt;

      if (showToast) {
        toast.warning(
          `Connection issue. Retrying in ${delay / 1000}s... (${remainingRetries} attempts left)`
        );
      }

      onRetry?.(attempt + 1);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}

// Usage
const cards = await fetchWithUserFeedback(
  () => fetchCustomCardsFromSupabase(),
  {
    maxRetries: 3,
    onRetry: (attempt) => console.log(`Retrying... attempt ${attempt}`),
    showToast: true,
  }
);
```

## Error Type Detection

```typescript
function isRetryableError(error: unknown): boolean {
  if (!error) return false;

  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // Supabase errors
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as any).code;

    // Retry on temporary failures
    if (code === 'PGRST301') return true; // Timeout
    if (code === '08006') return true; // Connection failure
    if (code === '57P01') return true; // Admin shutdown
  }

  // HTTP status codes
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status;
    return status === 429 || status === 500 || status === 502 || status === 503;
  }

  // Browser offline
  if (!navigator.onLine) {
    return true;
  }

  return false;
}
```

## Integration with Zustand Store

### Retry in Store Actions

```typescript
// src/stores/use-app-store.ts
import { fetchWithExponentialBackoff } from '@/lib/retry-utils';

export const useAppStore = create<AppStore>()((set, get) => ({
  // ...other state

  fetchCustomCards: async () => {
    set({ isLoadingCards: true, cardsError: null });

    try {
      // Wrap API call with retry logic
      const cards = await fetchWithExponentialBackoff(
        () => fetchCustomCardsFromSupabase(),
        3 // max retries
      );

      set({ customCards: cards, isLoadingCards: false });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch cards after retries';

      set({ cardsError: message, isLoadingCards: false });
      console.error('Error fetching custom cards:', error);
    }
  },

  addCustomCard: async (card) => {
    const tempId = `temp-${uuidv4()}`;
    const tempCard = {
      ...card,
      id: tempId,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    set({ customCards: [...get().customCards, tempCard] });

    try {
      // Retry on create
      const serverCard = await fetchWithExponentialBackoff(
        () => createCustomCardInSupabase(card),
        3
      );

      set({
        customCards: get().customCards.map((c) =>
          c.id === tempId ? serverCard : c
        ),
      });
    } catch (error) {
      // Rollback on failure
      set({
        customCards: get().customCards.filter((c) => c.id !== tempId),
        cardsError: 'Failed to create card after retries',
      });
      throw error;
    }
  },
}));
```

## Retry Utility Module

```typescript
// src/lib/retry-utils.ts

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, delay: number) => void;
  shouldRetry?: (error: unknown) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    onRetry,
    shouldRetry = isRetryableError,
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (!shouldRetry(error) || attempt === maxRetries) {
        throw error;
      }

      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, attempt),
        maxDelay
      );

      const jitter = Math.random() * exponentialDelay;

      onRetry?.(attempt + 1, jitter);

      await new Promise((resolve) => setTimeout(resolve, jitter));
    }
  }

  throw lastError!;
}

export function isRetryableError(error: unknown): boolean {
  // Implementation from above
}

// Convenience wrapper for Supabase queries
export async function retrySupabaseQuery<T>(
  queryFn: () => Promise<T>
): Promise<T> {
  return retry(queryFn, {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    onRetry: (attempt, delay) => {
      console.log(`Retry attempt ${attempt} after ${Math.round(delay)}ms`);
    },
  });
}
```

## Usage Examples

### Example 1: Fetch with Retry

```typescript
import { retrySupabaseQuery } from '@/lib/retry-utils';

async function fetchCards() {
  return retrySupabaseQuery(async () => {
    const { data, error } = await supabase.from('custom_cards').select('*');

    if (error) throw error;
    return data.map(dbToApp);
  });
}
```

### Example 2: Create with Manual Retry Button

```typescript
'use client';

export function CreateCardForm() {
  const [retryCount, setRetryCount] = useState(0);
  const { addCustomCard } = useAppStore();

  const handleSubmit = async (data) => {
    try {
      await addCustomCard(data);
      toast.success('Card created!');
    } catch (error) {
      toast.error(
        <div>
          Failed to create card.
          <button onClick={() => {
            setRetryCount(c => c + 1);
            handleSubmit(data);
          }}>
            Retry
          </button>
        </div>
      );
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Example 3: Offline Detection with Queue

```typescript
// Store failed operations for retry when online
const offlineQueue: Array<() => Promise<void>> = [];

window.addEventListener('online', async () => {
  console.log('Back online, processing queue...');

  for (const operation of offlineQueue) {
    try {
      await operation();
    } catch (error) {
      console.error('Failed to process queued operation:', error);
    }
  }

  offlineQueue.length = 0;
  toast.success('Synced offline changes');
});

export async function queueOrExecute(fn: () => Promise<void>) {
  if (!navigator.onLine) {
    offlineQueue.push(fn);
    toast.info('Offline - changes will sync when online');
  } else {
    await retry(fn);
  }
}
```

## Testing Retry Logic

```typescript
import { describe, it, expect, vi } from 'vitest';
import { retry } from './retry-utils';

describe('retry', () => {
  it('succeeds on first attempt', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const result = await retry(fn, { maxRetries: 3, baseDelay: 10 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));

    await expect(retry(fn, { maxRetries: 2, baseDelay: 10 })).rejects.toThrow(
      'fail'
    );

    expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });
});
```

## Best Practices

1. **Use exponential backoff** - Prevents overwhelming the server
2. **Add jitter** - Prevents thundering herd problem
3. **Limit max retries** - Don't retry forever (3-5 is typical)
4. **Cap max delay** - Don't make users wait minutes
5. **Show user feedback** - Let users know what's happening
6. **Don't retry client errors** - 400-level errors won't succeed on retry
7. **Log retry attempts** - Helps debug network issues
8. **Consider offline queue** - For mobile/PWA apps

## See Also

- `src/lib/retry-utils.ts` - Retry utility functions (to be created)
- `docs/error-handling.md` - General error handling patterns
- [Exponential Backoff Best Practices](https://cloud.google.com/iot/docs/how-tos/exponential-backoff)
