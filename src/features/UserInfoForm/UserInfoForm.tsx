'use client';

import cx from 'classnames';
import {FC, useState} from 'react';

import {Button} from '@shared/ui/Button';
import {Input} from '@shared/ui/Input';

import classes from './UserInfoForm.module.scss';
import {UserInfoFormProps} from './UserInfoForm.types';

export const UserInfoForm: FC<UserInfoFormProps> = ({className}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleChange = (obj: {
    name: string;
    value: string;
    event?: React.SyntheticEvent<HTMLInputElement>;
  }) => {
    setName(obj.value);
  };

  const handleChangePhone = (obj: {
    name: string;
    value: string;
    event?: React.SyntheticEvent<HTMLInputElement>;
  }) => {
    setPhone(obj.value);
  };

  const handleChangeEmail = (obj: {
    name: string;
    value: string;
    event?: React.SyntheticEvent<HTMLInputElement>;
  }) => {
    setEmail(obj.value);
  };

  return (
    <div className={cx(className, classes.wrapper)}>
      <Input
        className={classes.input}
        name='name'
        value={name}
        onChange={handleChange}
        placeholder='name'
        required
      />
      <Input
        className={classes.input}
        name='phone'
        value={phone}
        onChange={handleChangePhone}
        placeholder='phone'
        required
      />
      <Input
        className={classes.input}
        name='email'
        value={email}
        onChange={handleChangeEmail}
        placeholder='e-mail'
      />
      <Button size='small' className={classes.button} disabled={!name || !phone || !email}>
        <span>Send</span>
      </Button>
    </div>
  );
};
