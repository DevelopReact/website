import cx from 'classnames';
import {FC} from 'react';

import classes from './Divider.module.scss';
import {DividerAlignment, DividerProps} from './Divider.types';

const alignmentClassNameMap: Record<DividerAlignment, string> = {
  left: classes['divider--align-left'],
  right: classes['divider--align-right'],
};

export const Divider: FC<DividerProps> = ({className, align = 'left'}) => {
  const alignClassName = alignmentClassNameMap[align];

  return (
    <div className={cx(classes.divider, className, alignClassName)}>
      <span className={classes['divider__line']} />
    </div>
  );
};
