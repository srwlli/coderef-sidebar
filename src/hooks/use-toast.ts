import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  type?: ToastType;
}

interface UseToastReturn {
  toast: (toast: Omit<Toast, 'id'>) => void;
  toasts: Toast[];
  dismiss: (id: string) => void;
}

let toastCount = 0;

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = (++toastCount).toString();
    const newToast: Toast = {
      ...toastData,
      id,
    };

    setToasts((current) => [...current, newToast]);

    // Log to console for now (in a real app, you'd show a toast UI)
    console.log(
      `Toast [${newToast.variant || 'default'}]:`,
      newToast.title,
      newToast.description
    );

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  return { toast, toasts, dismiss };
}
