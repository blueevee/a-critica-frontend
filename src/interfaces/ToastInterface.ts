export interface ToastProps {
    message: string;
    isVisible: boolean;
    hideToast: () => void;
    className?: string;
  }