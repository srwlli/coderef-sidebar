let lastCopiedButton: string | null = null;
let subscribers: (() => void)[] = [];

export function getLastCopiedButton(): string | null {
  return lastCopiedButton;
}

export function setLastCopiedButton(buttonId: string): void {
  lastCopiedButton = buttonId;
  // Notify all subscribers
  subscribers.forEach((callback) => callback());
}

export function subscribeToButtonState(callback: () => void): () => void {
  subscribers.push(callback);

  // Return unsubscribe function
  return () => {
    subscribers = subscribers.filter((sub) => sub !== callback);
  };
}
