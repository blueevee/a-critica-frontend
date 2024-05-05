import React, { useEffect } from 'react';
import {ToastProps} from '../interfaces/ToastInterface'
import '../style/Toast.css'

export const Toast: React.FC<ToastProps> = ({ message, isVisible, hideToast, className }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div className={`toast ${className}`}>
      {message}
    </div>
  );
};
