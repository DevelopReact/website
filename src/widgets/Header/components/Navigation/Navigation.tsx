import cx from 'classnames';
import {useTranslations} from 'next-intl';
import {FC} from 'react';

import {Link} from '@i18n/navigation';
import {NAVIGATION_LINKS} from '@shared/config/constants';

import classes from './Navigation.module.scss';
import {NavigationProps} from './Navigation.types';

export const Navigation: FC<NavigationProps> = ({className}) => {
  const t = useTranslations('Header');
  return (
    <nav className={cx(classes.nav, className)}>
      <Link href={NAVIGATION_LINKS.SERVICES} className={classes.navLink}>
        {t('services')}
      </Link>
      <Link href={NAVIGATION_LINKS.CASE_STUDIES} className={classes.navLink}>
        {t('case-studies')}
      </Link>
      <Link href={NAVIGATION_LINKS.PRODUCTS} className={classes.navLink}>
        {t('products')}
      </Link>
      <Link href={NAVIGATION_LINKS.BLOG} className={classes.navLink}>
        {t('blog')}
      </Link>
      <Link href={NAVIGATION_LINKS.ABOUT_US} className={classes.navLink}>
        {t('about_us')}
      </Link>
      {/* <a className={cx(classes.navLink, classes.email)} href="mailto:info@apibim.com">
        info@apibim.com
      </a> */}
    </nav>
  );
};
