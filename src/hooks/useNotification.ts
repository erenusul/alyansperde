import { useState, useCallback } from 'react';
import type { Toast, ToastType } from '../components/Toast';

export const useNotification = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: string) => {
    showToast(message, 'success');
  }, [showToast]);

  const error = useCallback((message: string) => {
    showToast(message, 'error');
  }, [showToast]);

  const warning = useCallback((message: string) => {
    showToast(message, 'warning');
  }, [showToast]);

  const info = useCallback((message: string) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
  };
};

