'use client';

import cx from 'classnames';
import {useUnit} from 'effector-react';
import {useTranslations} from 'next-intl';
import React, {FC} from 'react';

import {openModal} from '@features/FormModal/store/model';
import {Button} from '@shared/ui';

import classes from './ButtonWrapper.module.scss';
import {ButtonWrapperProps} from './ButtonWrapper.types';

export const ButtonWrapper: FC<ButtonWrapperProps> = ({className}) => {
  const t = useTranslations('StagesSection');

  const _openModal = useUnit(openModal);

  const handleClickContactButton = () => {
    _openModal();
  };

  return (
    <div className={cx(className, classes.buttonWrapper)}>
      <Button
        className={classes.contactButton}
        variant='primary'
        size='large'
        onClick={handleClickContactButton}
      >
        {t('contactButton')}
      </Button>
    </div>
  );
};
