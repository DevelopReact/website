'use client';

import cx from 'classnames';
import React, {FC} from 'react';

import classes from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
  error?: boolean;
  required?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  children,
  className,
  error,
  required,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={cx(classes.wrapper, className, {
        [classes.error]: error,
      })}
    >
      <input type='checkbox' checked={checked} onChange={handleChange} className={classes.input} />
      <div className={classes.checkmark}>
        {checked && (
          <svg width='12' height='9' viewBox='0 0 12 9' fill='none'>
            <path
              d='M1 4.5L4.5 8L11 1.5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>
      <div
        className={cx(classes.label, {
          [classes['label--required']]: required,
        })}
      >
        {children}
      </div>
    </label>
  );
};
