'use client';

import cx from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect} from 'react';

import {MODAL_PORTAL_ID} from '@shared/config/constants';

import classes from './Modal.module.scss';
import {ModalProps} from './Modal.types';
import {CloseIcon} from '../icons/CloseIcon';
import {Portal} from '../Portal';

export const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  children,
  className,
  onClose = () => {},
  width = 'xl',
  isFullWidth = false,
  contentClassName = '',
  bodyClassName = '',
  iconPosition = 'absolute',
  toDown = false,
  closeTop = false,
}) => {
  useEffect(() => {
    const body = window.document.querySelector('body');
    if (isOpen && !className) {
      body?.classList.add('no-scroll');
    }

    return () => {
      body?.classList.remove('no-scroll');
    };
  }, [isOpen, className]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal selector={`#${MODAL_PORTAL_ID}`}>
          <div
            className={cx(className, classes.wrapper, {
              [classes.wrapper_open]: isOpen,
              [classes.wrapper_toDown]: toDown,
            })}
          >
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={cx(classes.overlay)}
              onClick={onClose}
              role='presentation'
            />
            <motion.div
              initial={{opacity: 0, x: 80}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: 80}}
              className={cx(
                classes.body,
                bodyClassName,
                {
                  [classes[`body_width-${width}`]]: true,
                },

                {
                  [classes['body_full-size']]: isFullWidth,
                },
              )}
            >
              <button
                onClick={onClose}
                className={cx(classes.close, classes[`close_position_${iconPosition}`], {
                  [classes.close_position_absolute_inTop]: closeTop,
                })}
                type='button'
              >
                <CloseIcon
                  className={cx(classes.icon)}
                  fill='var(--color-light-gray)'
                  width={20}
                  height={20}
                />
              </button>

              <div
                className={cx(
                  classes.content,
                  {
                    [classes['content_full-size']]: isFullWidth,
                  },
                  contentClassName,
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};
