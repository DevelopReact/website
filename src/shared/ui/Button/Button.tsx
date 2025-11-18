'use client';

import cx from 'classnames';
import {motion, MotionProps} from 'framer-motion';
import React, {FC, ReactElement} from 'react';

import {Link} from '@i18n/navigation';
import {clickVariants} from '@shared/config/constants';

import classes from './Button.module.scss';
import {ButtonProps, IButtonProps, ILinkProps} from './Button.types';

const ButtonLocal: FC<ButtonProps> = ({
  className,
  tag = 'button',
  variant = 'primary',
  size = 'large',
  children,
  ...props
}): ReactElement => {
  const classNames = cx(
    classes.button,
    classes[`button--variant-${variant}`],
    classes[`button--size-${size}`],
    className,
  );
  if (tag === 'a') {
    const {href, ...rest} = props as ILinkProps;
    return (
      //@ts-ignore
      <motion.a
        variants={clickVariants}
        initial='rest'
        whileHover='hover'
        whileTap='hover'
        className={classNames}
        href={href}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  if (tag === 'link') {
    const {href = '', ...rest} = props as ILinkProps;
    return (
      <Link className={classNames} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const {customRef, disabled, onClick, ...rest} = props as IButtonProps & MotionProps;

  const onClickLocal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      if (disabled) return;
      onClick(event);
    }
  };

  return (
    <motion.button
      variants={clickVariants}
      initial='rest'
      whileHover='hover'
      whileTap='hover'
      className={classNames}
      disabled={disabled}
      onClick={onClickLocal}
      ref={customRef}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export const Button = React.memo(ButtonLocal);
