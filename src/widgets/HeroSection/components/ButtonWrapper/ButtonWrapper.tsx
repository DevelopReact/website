'use client';

import cx from 'classnames';
import {useUnit} from 'effector-react';
import {useTranslations} from 'next-intl';
import React, {FC} from 'react';

import {openModal} from '@features/FormModal/store/model';
import {Button} from '@shared/ui/Button';

import classes from './ButtonWrapper.module.scss';
import {ButtonWrapperProps} from './ButtonWrapper.types';

export const ButtonWrapper: FC<ButtonWrapperProps> = ({className}) => {
  const t = useTranslations('HeroSection');
  const openContactModal = useUnit(openModal);

  const handleClick = () => {
    openContactModal();
  };

  return (
    <div className={cx(className, classes.buttonWrapper)}>
      <Button className={classes.button} size='large' variant='primary-dark' onClick={handleClick}>
        {t('button')}
      </Button>
    </div>
  );
};
