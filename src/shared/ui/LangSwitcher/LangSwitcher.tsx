'use client';

import cx from 'classnames';
import {AnimatePresence, motion} from 'motion/react';
import {FC, RefObject, useRef, useState} from 'react';
import {useOnClickOutside} from 'usehooks-ts';

import {Links} from './components/Links';
import classes from './LangSwitcher.module.scss';
import {LangSwitcherProps} from './LangSwitcher.types';
import {WorldIcon} from '../icons';

export const LangSwitcher: FC<LangSwitcherProps> = ({className, isRow}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const handleClickInside = () => {
    setIsOpen(true);
  };

  useOnClickOutside(ref as RefObject<HTMLDivElement>, handleClickOutside);

  return (
    <div
      ref={ref}
      onClick={handleClickInside}
      className={cx(className, classes.wrapper, isRow && classes.wrapperRow)}
    >
      <WorldIcon className={classes.icon} />
      {!isRow ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{opacity: 0, y: -10, x: '-50%'}}
              animate={{opacity: 1, y: 0, x: '-50%'}}
              exit={{opacity: 0, y: 10, x: '-50%'}}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
              className={cx(classes.menu)}
            >
              <Links />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{height: 0, opacity: 1}}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                    duration: 0.3,
                  },
                  opacity: {duration: 0.25},
                },
              }}
              exit={{
                height: 0,
                opacity: 1,
                transition: {
                  height: {duration: 0.25},
                  opacity: {duration: 0.15},
                },
              }}
              className={cx(classes.menu, classes.menuRow)}
            >
              <div className={classes.menuRowInner}>
                <Links />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
