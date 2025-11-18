'use client';

import cx from 'classnames';
import {useUnit} from 'effector-react';
import {AnimatePresence, motion} from 'motion/react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {FC, useState} from 'react';
import {useMediaQuery} from 'usehooks-ts';

import {openModal} from '@features/FormModal/store/model';
import {Link} from '@i18n/navigation';
import {useScrollProgress} from '@shared/hooks';
import {Button} from '@shared/ui';
import {LangSwitcher} from '@shared/ui/LangSwitcher';

import {BurgerButton} from './components/BurgerButton';
import {Navigation} from './components/Navigation';
import classes from './Header.module.scss';
import {HeaderProps} from './Header.types';

export const Header: FC<HeaderProps> = ({className}) => {
  const t = useTranslations('HeroSection');
  const openContactModal = useUnit(openModal);

  const isTablet = useMediaQuery('(max-width: 992px)');
  const scrollProgress = useScrollProgress();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    openContactModal();
  };

  return (
    <header
      className={cx(
        className,
        classes.wrapper,
        (scrollProgress >= 0.075 || isTablet) && classes['wrapper--withBg'],
      )}
    >
      <div className={classes.container}>
        <div className={classes.content}>
          <Link href='/' className={classes.logo}>
            <Image width={141} height={52} src='/images/logo4.svg' alt='API BIM' />
          </Link>
          {isTablet && (
            <AnimatePresence>
              {isMenuOpen && (
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
                  className={cx(classes.menu, isTablet && classes.menuTablet)}
                >
                  <Navigation className={classes.navTablet} />
                  <LangSwitcher isRow />
                  <Button
                    onClick={handleClick}
                    size='medium'
                    variant='primary'
                    className={classes.contactButton}
                  >
                    {t('contact')}
                    <div className={classes.imgWrapper}>
                      <Image
                        fill
                        src='/images/phone.svg'
                        alt='Phone icon'
                        className={classes.contactIcon}
                      />
                    </div>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          {!isTablet && (
            <>
              <div className={classes.navWrapper}>
                <Navigation className={classes.navigation} />
                <span
                  className={classes.navDivider}
                  style={{
                    left: `calc(${scrollProgress * 100}% - ${scrollProgress * 395}px)`,
                  }}
                />
              </div>
              <LangSwitcher className={classes.langSwitcher} />
            </>
          )}
        </div>
        {isTablet && <BurgerButton onClick={handleBurgerClick} />}
        {!isTablet && (
          <Button
            onClick={handleClick}
            size='medium'
            variant='primary'
            className={cx(classes.contactButton, classes['contactButton--absolute'])}
          >
            {t('contact')}
            <div className={classes.imgWrapper}>
              <Image
                fill
                src='/images/phone.svg'
                alt='Phone icon'
                className={classes.contactIcon}
              />
            </div>
          </Button>
        )}
      </div>
    </header>
  );
};
