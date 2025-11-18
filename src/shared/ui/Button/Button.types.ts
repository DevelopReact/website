import {AnchorHTMLAttributes, ButtonHTMLAttributes, Ref} from 'react';

export type VariantButton = 'primary' | 'primary-dark' | 'primary-inverse';
export type SizeButton = 'large' | 'medium' | 'small';

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tag?: 'a' | 'link';
  href?: string;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tag?: 'button';
  customRef?: Ref<HTMLButtonElement> | null;
}

export type ButtonProps = {
  className?: string;
  variant?: VariantButton;
  size?: SizeButton;
  disabled?: boolean;
} & (ILinkProps | IButtonProps);
