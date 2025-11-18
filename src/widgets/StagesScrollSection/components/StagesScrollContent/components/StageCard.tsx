import cx from 'classnames';
import {FC, memo} from 'react';

import {Text} from '@shared/ui';
import {StageItem} from '@widgets/StagesScrollSection';

import classes from '../StagesScrollContent.module.scss';

interface StageCardProps {
  stage: StageItem;
  isActive: boolean;
}

/* eslint-disable react/prop-types */
export const StageCard: FC<StageCardProps> = memo(({stage, isActive}) => {
  return (
    <article
      className={cx(classes.card, {
        [classes.cardActive]: isActive,
      })}
    >
      <Text.Title level={4} className={classes.cardTitle}>
        {stage.index.toString()}. {stage.title}
      </Text.Title>
      <Text.Body level={3} className={classes.cardDescription}>
        {stage.description}
      </Text.Body>
    </article>
  );
});
/* eslint-enable react/prop-types */

StageCard.displayName = 'StageCard';
