import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    message: string;
    title: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  const confirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirmState({
          isOpen: true,
          title: options.title || 'Onay',
          message: options.message,
          confirmText: options.confirmText || 'Evet',
          cancelText: options.cancelText || 'İptal',
          onConfirm: () => {
            setConfirmState(null);
            resolve(true);
          },
          onCancel: () => {
            setConfirmState(null);
            resolve(false);
          },
        });
      });
    },
    []
  );

  const handleCancel = useCallback(() => {
    if (confirmState) {
      confirmState.onCancel();
    }
  }, [confirmState]);

  return {
    confirm,
    confirmState,
    handleCancel,
  };
};
