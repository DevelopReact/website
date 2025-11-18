import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  width?: 'xl' | 'l' | 'm' | 's' | 'xs';
  iconPosition?: 'absolute' | 'relative';
  isFullWidth?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
  toDown?: boolean;
  closeTop?: boolean;
}
