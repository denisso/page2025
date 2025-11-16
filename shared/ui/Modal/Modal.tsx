import React from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import cn from 'classnames';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  className,
}: ModalProps) {
  if (!open) return null;
  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };
  return createPortal(
    <div className={style.modalOverlay}>
      <div
        className={style.modalBackdrop}
        onClick={onClose}
        onKeyDown={handleBackdropKeyDown}
      />
      <div className={cn(style.modalContent, className)}>{children}</div>
    </div>,
    document.body,
  );
}
