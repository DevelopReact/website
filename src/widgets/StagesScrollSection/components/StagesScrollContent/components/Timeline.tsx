import {FC, memo} from 'react';

import classes from '../StagesScrollContent.module.scss';

import type {TimelineMetrics} from '../hooks/useTimelineMetrics';
import type {RefObject} from 'react';

interface TimelineProps {
  timelineRef: RefObject<HTMLDivElement>;
  metrics: TimelineMetrics;
}

/* eslint-disable react/prop-types */
export const Timeline: FC<TimelineProps> = memo(({timelineRef, metrics}) => {
  return (
    <div className={classes.timelineColumn}>
      <div ref={timelineRef} className={classes.timeline}>
        <span className={classes.timelineTrack} />
        <span
          className={classes.timelineIndicator}
          style={{
            height: metrics.height > 0 ? `${metrics.height}px` : undefined,
            transform: `translateY(${metrics.offset}px)`,
          }}
        />
      </div>
    </div>
  );
});
/* eslint-enable react/prop-types */

Timeline.displayName = 'Timeline';
