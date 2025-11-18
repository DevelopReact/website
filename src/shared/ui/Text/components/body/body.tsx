import cn from 'classnames';

import {Typography} from '@shared/ui/Typography';

import styles from './styles.module.scss';
import {TEXT_COLOR_TYPES} from '../../constants';
import commonStyles from '../../Text.module.scss';
import {TextProps} from '../../Text.types';

export const Body = ({
  color = TEXT_COLOR_TYPES.PRIMARY,
  state,
  level,
  children,
  id,
  className,
}: TextProps) => (
  <Typography
    id={id}
    className={cn(
      styles.body,
      styles[`level-${level}`],
      commonStyles[color],
      state && commonStyles[`${color}-${state}`],
      className,
    )}
  >
    {children}
  </Typography>
);
