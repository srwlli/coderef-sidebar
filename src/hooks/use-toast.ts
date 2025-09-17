import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  type?: ToastType;
}

interface UseToastReturn {
  toast: (toast: Toast) => void;
}

export function useToast(): UseToastReturn {
  const toast = useCallback((toastData: Toast) => {
    const { title, description, variant, type } = toastData;

    // Determine the appropriate Sonner toast type
    if (variant === 'destructive' || type === 'error') {
      sonnerToast.error(title, {
        description,
        duration: 5000,
      });
    } else if (type === 'success') {
      sonnerToast.success(title, {
        description,
        duration: 4000,
      });
    } else if (type === 'warning') {
      sonnerToast.warning(title, {
        description,
        duration: 5000,
      });
    } else if (type === 'info') {
      sonnerToast.info(title, {
        description,
        duration: 4000,
      });
    } else {
      // Default toast
      sonnerToast(title, {
        description,
        duration: 4000,
      });
    }
  }, []);

  return { toast };
}
