'use client';

import cx from 'classnames';
import React, {useCallback} from 'react';

import classes from './TextArea.module.scss';
import {TextAreaProps} from './TextArea.types';

export const TextArea = ({
  className,
  value,
  label,
  name,
  placeholder,
  required,
  disabled,
  fluid,
  rows = 4,
  onChange,
  onFocus,
  onBlur,
}: TextAreaProps) => {
  const handleChange = useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
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
    <div className={cx(classes.textarea__wrapper, className)}>
      {label && (
        <label
          htmlFor={name}
          className={cx(classes.textarea__label, {
            [classes['textarea__label--required']]: required,
          })}
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        className={cx(classes.textarea, {[classes['textarea--fluid']]: fluid})}
        id={name}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

TextArea.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  fluid: false,
  rows: 4,
  onChange: () => {},
};
