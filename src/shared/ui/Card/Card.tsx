import cx from 'classnames';
import React, {FC} from 'react';

import classes from './Card.module.scss';
import {CardProps} from './Card.types';

export const Card: FC<CardProps> = ({className, children}) => {
  return <div className={cx(className, classes.wrapper)}>{children}</div>;
};
