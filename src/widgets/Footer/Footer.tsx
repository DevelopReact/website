import cx from 'classnames';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {FC} from 'react';

import {Link} from '@i18n/navigation';
import {NAVIGATION_LINKS} from '@shared/config/constants';
import {Text} from '@shared/ui/Text';

import {ButtonWrapper} from './components/ButtonWrapper';
import classes from './Footer.module.scss';
import {FooterProps} from './Footer.types';

export const Footer: FC<FooterProps> = async ({className}) => {
  const t = await getTranslations('Footer');
  return (
    <footer className={cx(className, classes.wrapper)}>
      <div className={classes.container}>
        <div className={classes.inner}>
          <div className={classes.col}>
            <Link href='/' className={classes.logo}>
              <Image width={98} height={24} src='/images/logo2.svg' alt='Logo' />
            </Link>
            <Text.Body level={3} color={'primary-inverse'} className={classes.description}>
              {t('description')}
            </Text.Body>
            <div className={classes.socials}>
              <a
                href='https://www.linkedin.com/company/apibimcom'
                target='_blank'
                className={classes.iconLink}
                rel='noreferrer'
              >
                <Image
                  src='/images/socials/linkedin.svg'
                  alt='LinkedIn'
                  className={classes.icon}
                  width={30}
                  height={30}
                />
              </a>
              <a
                href='https://www.instagram.com/apibimcom'
                target='_blank'
                className={classes.iconLink}
                rel='noreferrer'
              >
                <Image
                  src='/images/socials/instagram.svg'
                  alt='Instagram'
                  className={classes.icon}
                  width={30}
                  height={30}
                />
              </a>
              <a
                href='https://github.com/apibimcom'
                target='_blank'
                className={classes.iconLink}
                rel='noreferrer'
              >
                <Image
                  src='/images/socials/github.svg'
                  alt='Github'
                  className={classes.icon}
                  width={30}
                  height={30}
                />
              </a>{' '}
              <a
                href='https://www.youtube.com/@apibim'
                target='_blank'
                className={classes.iconLink}
                rel='noreferrer'
              >
                <Image
                  src='/images/socials/youtube.svg'
                  alt='Youtube'
                  className={classes.icon}
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>
          <div className={cx(classes.col, classes.links)}>
            <Link className={classes.link} href={NAVIGATION_LINKS.SERVICES}>
              <Text.Body level={4} className={classes.linkText}>
                {t('services')}
              </Text.Body>
            </Link>
            <Link className={classes.link} href={NAVIGATION_LINKS.CASE_STUDIES}>
              <Text.Body level={4} className={classes.linkText}>
                {t('case-studies')}
              </Text.Body>
            </Link>
            <Link className={classes.link} href={NAVIGATION_LINKS.PRODUCTS}>
              <Text.Body level={4} className={classes.linkText}>
                {t('products')}
              </Text.Body>
            </Link>
            <Link className={classes.link} href={NAVIGATION_LINKS.BLOG}>
              <Text.Body level={4} className={classes.linkText}>
                {t('blog')}
              </Text.Body>
            </Link>
            <Link className={classes.link} href={NAVIGATION_LINKS.ABOUT_US}>
              <Text.Body level={4} className={classes.linkText}>
                {t('about_us')}
              </Text.Body>
            </Link>
          </div>
          <div className={classes.col}>
            <ButtonWrapper />
            <a href='mailto:info@apibim.com' className={classes.link}>
              <Image
                src='/images/envelope.svg'
                alt='Youtube'
                className={classes.icon}
                width={24}
                height={24}
              />
              <Text.Body level={4} className={classes.linkText}>
                info@apibim.com
              </Text.Body>
            </a>
            <a href='tel:+56945547273' className={classes.link}>
              <Image
                src='/images/phone.svg'
                alt='Youtube'
                className={classes.icon}
                width={24}
                height={24}
              />
              <Text.Body level={4} className={classes.linkText}>
                +56 9 4554 7273
              </Text.Body>
            </a>
            <div className={classes.link}>
              <Image
                src='/images/location.svg'
                alt='Youtube'
                className={classes.icon}
                width={24}
                height={24}
              />
              <Text.Body level={4} className={classes.office}>
                {t('office')}
              </Text.Body>
            </div>
          </div>
        </div>
        <div className={classes.bottomContent}>
          <Text.Body level={4} className={classes.copyright}>
            {t('copyright')}
          </Text.Body>
          <div className={classes.socials}>
            <Link href={NAVIGATION_LINKS.BLOG} className={classes.link}>
              <Text.Body level={4} className={classes.linkText}>
                {t('privacy-policy')}
              </Text.Body>
            </Link>
            <Link href={NAVIGATION_LINKS.BLOG} className={classes.link}>
              <Text.Body level={4} className={classes.linkText}>
                {t('cookie-policy')}
              </Text.Body>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
