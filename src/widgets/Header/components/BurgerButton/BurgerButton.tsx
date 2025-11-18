import cx from 'classnames';
import Image from 'next/image';
import {FC} from 'react';

import classes from './BurgerButton.module.scss';
import {BurgerButtonProps} from './BurgerButton.types';

export const BurgerButton: FC<BurgerButtonProps> = ({className, onClick}) => {
  return (
    <button className={cx(className, classes.wrapper)} onClick={onClick}>
      <Image
        width={24}
        height={24}
        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='%23000' stroke-linecap='butt' stroke-miterlimit='10' stroke-width='3' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"
        alt='hamburger'
        className={classes.icon}
      />
    </button>
  );
};
