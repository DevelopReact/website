import cx from 'classnames';
import {useLocale} from 'next-intl';
import {FC} from 'react';

import {Link, usePathname} from '@i18n/navigation';

import classes from './Links.module.scss';
import {LinksProps} from './Links.types';

export const Links: FC<LinksProps> = () => {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <>
      <Link
        href={pathname}
        locale='en'
        className={cx(classes.menuItem, locale === 'en' && classes['menuItem--active'])}
      >
        <span>EN</span>
      </Link>
      <Link
        href={pathname}
        locale='es'
        className={cx(classes.menuItem, locale === 'es' && classes['menuItem--active'])}
      >
        <span>ES</span>
      </Link>
    </>
  );
};
