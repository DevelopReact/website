'use client';

import cx from 'classnames';
import {useUnit} from 'effector-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import React, {FC} from 'react';

import {openModal} from '@features/FormModal/store/model';
import {Button} from '@shared/ui';

import classes from './ButtonWrapper.module.scss';
import {ButtonWrapperProps} from './ButtonWrapper.types';

export const ButtonWrapper: FC<ButtonWrapperProps> = ({className}) => {
  const t = useTranslations('Footer');
  const _openModal = useUnit(openModal);

  const handleClickContactButton = () => {
    _openModal();
  };

  return (
    <div className={cx(className, classes.wrapper)}>
      <Button
        size='medium'
        variant={'primary-inverse'}
        className={classes.button}
        onClick={handleClickContactButton}
      >
        <div>{t('contact_us')}</div>
        <div>
          <Image
            src='/images/call.svg'
            alt='Call'
            className={classes.icon}
            width={20}
            height={20}
          />
        </div>
      </Button>
    </div>
  );
};
