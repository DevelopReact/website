import cx from 'classnames';
import {FC} from 'react';

import {SIZE} from './constants';
import classes from './Container.module.scss';
import {ContainerProps} from './Container.types';

export const Container: FC<ContainerProps> = ({className, children, size = SIZE.STANDARD}) => {
  return (
    <div className={cx(className, classes.wrapper, classes[`wrapper--${size}`])}>{children}</div>
  );
};
