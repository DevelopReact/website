import Image from 'next/image';
import {FC, memo} from 'react';

import {StageItem} from '@widgets/StagesScrollSection';

import classes from '../StagesScrollContent.module.scss';

interface VisualFrameProps {
  stage: StageItem | null;
}

/* eslint-disable react/prop-types */
export const VisualFrame: FC<VisualFrameProps> = memo(({stage}) => {
  if (!stage) {
    return null;
  }

  return (
    <div className={classes.visualColumn}>
      <div className={classes.visualFrame}>
        <Image
          src='/images/stages/stage.png'
          alt={stage.title}
          width={397}
          height={629}
          className={classes.visualImage}
          priority
        />
        <span className={classes.counterValue}>{stage.index}</span>
      </div>
    </div>
  );
});
/* eslint-enable react/prop-types */

VisualFrame.displayName = 'VisualFrame';
