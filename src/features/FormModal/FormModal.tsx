'use client';

import cx from 'classnames';
import {useUnit} from 'effector-react';
import {useTranslations} from 'next-intl';
import React, {FC, useEffect, useState} from 'react';

import {Button} from '@shared/ui/Button';
import {Checkbox} from '@shared/ui/Checkbox';
import {FileUpload} from '@shared/ui/FileUpload';
import {Input} from '@shared/ui/Input';
import {Modal} from '@shared/ui/Modal';
import {TextArea} from '@shared/ui/TextArea';

import classes from './FormModal.module.scss';
import {FormModalProps} from './FormModal.types';
import {
  $isModalOpen,
  $formData,
  $formErrors,
  $submissionState,
  $canSubmit,
  closeModal,
  updateFormField,
  addFiles,
  removeFile,
  submitForm,
} from './store/model';

export const FormModal: FC<FormModalProps> = ({className}) => {
  const t = useTranslations('ContactForm');
  const [isMobile, setIsMobile] = useState(false);

  const isOpen = useUnit($isModalOpen);
  const formData = useUnit($formData);
  const formErrors = useUnit($formErrors);
  const submissionState = useUnit($submissionState);
  const canSubmit = useUnit($canSubmit);

  const _closeModal = useUnit(closeModal);
  const _updateFormField = useUnit(updateFormField);
  const _addFiles = useUnit(addFiles);
  const _removeFile = useUnit(removeFile);
  const _submitForm = useUnit(submitForm);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 990);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleFieldChange = (field: keyof typeof formData) => (obj: {value: string}) => {
    _updateFormField({field, value: obj.value});
  };

  const handleCheckboxChange = (checked: boolean) => {
    _updateFormField({field: 'agreeToPrivacyPolicy', value: checked});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    _submitForm();
  };

  if (submissionState.isSuccess) {
    return (
      <Modal
        className={cx(className)}
        isOpen={isOpen}
        onClose={_closeModal}
        width='m'
        isFullWidth={isMobile}
      >
        <div className={classes.successMessage}>
          <div className={classes.successIcon}>
            <svg width='48' height='48' viewBox='0 0 48 48' fill='none'>
              <circle cx='24' cy='24' r='24' fill='#10B981' />
              <path
                d='M16 24l6 6 12-12'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h2 className={classes.successTitle}>{t('success.title')}</h2>
          <p className={classes.successText}>{t('success.message')}</p>
          <Button
            variant='primary'
            size='medium'
            onClick={_closeModal}
            className={classes.successButton}
          >
            OK
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      className={cx(className)}
      isOpen={isOpen}
      onClose={_closeModal}
      width='l'
      isFullWidth={isMobile}
    >
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {t('title')} <br />
            <span className={classes.subtitle}>{t('subtitle')}</span>
          </h2>
        </div>

        {/* ВАЖНО: кнопка сабмита теперь внутри формы */}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <div className={classes.row}>
            <Input
              name='firstName'
              value={formData.firstName}
              onChange={handleFieldChange('firstName')}
              label={t('firstName')}
              required
              error={formErrors.firstName}
              className={cx(classes.input)}
            />
            <Input
              name='lastName'
              value={formData.lastName}
              onChange={handleFieldChange('lastName')}
              label={t('lastName')}
              required
              error={formErrors.lastName}
              className={cx(classes.input)}
            />
          </div>

          <Input
            name='companyName'
            value={formData.companyName}
            onChange={handleFieldChange('companyName')}
            label={t('companyName')}
            className={cx(classes.input)}
          />

          <Input
            name='workEmail'
            type='email'
            value={formData.workEmail}
            onChange={handleFieldChange('workEmail')}
            label={t('workEmail')}
            required
            error={formErrors.workEmail}
            className={cx(classes.input)}
          />

          <TextArea
            name='message'
            value={formData.message}
            onChange={(obj) => _updateFormField({field: 'message', value: obj.value})}
            label={t('message')}
            className={cx(classes.input)}
            rows={4}
          />

          <FileUpload
            files={formData.files}
            onFilesAdd={_addFiles}
            onFileRemove={_removeFile}
            error={formErrors.files}
            className={classes.fileUpload}
          />

          <Checkbox
            checked={formData.agreeToPrivacyPolicy}
            onChange={handleCheckboxChange}
            error={!!formErrors.agreeToPrivacyPolicy}
            className={classes.checkbox}
            required
          >
            {t('agreeToPrivacyPolicy')}{' '}
            <a href='/privacy-policy' target='_blank' rel='noreferrer'>
              {t('privacyPolicy')}
            </a>
          </Checkbox>

          {submissionState.error && (
            <div className={classes.errorMessage}>{submissionState.error}</div>
          )}

          <div className={classes.submitButtonWrapper}>
            <Button
              type='submit'
              variant='primary'
              size='large'
              disabled={!canSubmit}
              className={classes.submitButton}
            >
              {submissionState.isSubmitting ? 'Sending...' : t('submitForm')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
