'use client';

import cx from 'classnames';
import {useTranslations} from 'next-intl';
import React, {useRef, FC} from 'react';

import classes from './FileUpload.module.scss';
import {CloseIcon} from '../icons/CloseIcon';

interface FileUploadProps {
  files: File[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  className?: string;
  error?: string;
}

export const FileUpload: FC<FileUploadProps> = ({
  files,
  onFilesAdd,
  onFileRemove,
  className,
  error,
}) => {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      onFilesAdd(selectedFiles);
    }
    // Очищаем input для возможности повторного выбора того же файла
    event.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={cx(classes.wrapper, className)}>
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='.doc,.docx,.pdf,.ppt,.pptx'
        onChange={handleFileChange}
        className={classes.hiddenInput}
      />

      <div
        className={cx(classes.fileUploadWrapper, {
          [classes.fileUploadWrapperError]: error,
        })}
      >
        <button
          type='button'
          onClick={handleFileSelect}
          className={cx(classes.uploadButton, {
            [classes.uploadButtonError]: error,
          })}
        >
          <svg className={classes.attachIcon} width='16' height='16' viewBox='0 0 24 24'>
            <path
              d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          {t('ContactForm.attachFile')}
        </button>
        {files.length > 0 && (
          <div className={classes.fileList}>
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className={classes.fileItem}>
                <div className={classes.fileDetails}>
                  <span className={classes.fileName}>{file.name}</span>
                  <span className={classes.fileSize}>{formatFileSize(file.size)}</span>
                </div>
                <button
                  type='button'
                  onClick={() => onFileRemove(index)}
                  className={classes.removeButton}
                  aria-label='Remove file'
                >
                  <CloseIcon fill='var(--color-dark-gray)' width={10} height={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={classes.fileInfo}>
        <div className={classes.fileInfoText}>{t('ContactForm.attachFileInfo')}</div>
        <div className={classes.fileFormats}>{t('ContactForm.attachFileFormats')}</div>
      </div>

      {error && <div className={classes.error}>{t(error)}</div>}
    </div>
  );
};
