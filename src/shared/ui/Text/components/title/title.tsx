import cn from 'classnames';

import {Typography} from '@shared/ui/Typography';

import styles from './styles.module.scss';
import {TitleTag} from './types';
import {TEXT_COLOR_TYPES} from '../../constants';
import commonStyles from '../../Text.module.scss';
import {TextProps} from '../../Text.types';

export const Title = ({
  color = TEXT_COLOR_TYPES.PRIMARY,
  state,
  level,
  children,
  id,
  className,
}: TextProps) => {
  const titleTag = `h${level}` as TitleTag;

  return (
    <Typography
      id={id}
      className={cn(
        styles.title,
        styles[`level-${level}`],
        commonStyles[color],
        state && commonStyles[`${color}-${state}`],
        className,
      )}
      tagName={titleTag}
    >
      {children}
    </Typography>
  );
};
