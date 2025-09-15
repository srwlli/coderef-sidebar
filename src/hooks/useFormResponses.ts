import { useQuery } from '@tanstack/react-query';
import { FormResponsesData } from '@/types/form-response';

async function fetchFormResponses(): Promise<FormResponsesData> {
  const response = await fetch('/api/form-responses');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch form responses');
  }

  return response.json();
}

export function useFormResponses() {
  return useQuery({
    queryKey: ['form-responses'],
    queryFn: fetchFormResponses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Auto-refetch every 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
