'use client';

import cx from 'classnames';
import {useTranslations} from 'next-intl';
import React, {useCallback} from 'react';

import classes from './Input.module.scss';

export interface InputProps {
  name: string;
  value: string;
  onChange: (obj: {
    name: string;
    value: string;
    event?: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  onFocus?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

export const Input = ({
  className,
  value,
  label,
  name,
  placeholder,
  required,
  disabled,
  fluid,
  onChange,
  onFocus,
  onBlur,
  type = 'text',
  error,
}: InputProps) => {
  const t = useTranslations();

  const handleChange = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const eventValue = event.currentTarget.value;
      onChange({
        name,
        value: eventValue,
        event,
      });
    },
    [onChange, name],
  );
  return (
    <div className={cx(classes.input__wrapper, className)}>
      {label && (
        <label
          htmlFor={name}
          className={cx(classes.input__label, {
            [classes['input__label--required']]: required,
          })}
        >
          {label}
        </label>
      )}
      <input
        value={value}
        className={cx(
          classes.input,
          {[classes['input--fluid']]: fluid},
          {
            [classes['input--error']]: error && error !== '',
          },
        )}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && error !== '' && <div className={classes.input__error}>{t(error)}</div>}
    </div>
  );
};
Input.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  fluid: false,
  onChange: () => {},
};
