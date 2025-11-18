import {useLayoutEffect, useRef, useState} from 'react';

import type {RefObject} from 'react';

export interface TimelineMetrics {
  height: number;
  offset: number;
}

export interface UseTimelineMetricsParams {
  activeIndex: number;
  stagesCount: number;
}

const MIN_INDICATOR_HEIGHT = 72;

export const useTimelineMetrics = ({
  activeIndex,
  stagesCount,
}: UseTimelineMetricsParams): [RefObject<HTMLDivElement>, TimelineMetrics] => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<TimelineMetrics>({
    height: 0,
    offset: 0,
  });

  useLayoutEffect(() => {
    const track = timelineRef.current;

    if (!track || stagesCount === 0) {
      setMetrics({height: 0, offset: 0});
      return;
    }

    const updateMetrics = (): void => {
      const trackHeight = track.clientHeight;

      if (trackHeight <= 0) {
        setMetrics({height: 0, offset: 0});
        return;
      }

      const segments = stagesCount || 1;
      const baseHeight = trackHeight / segments;
      const indicatorHeight = Math.min(
        trackHeight,
        Math.max(MIN_INDICATOR_HEIGHT, baseHeight * 0.8),
      );
      const maxOffset = Math.max(0, trackHeight - indicatorHeight);
      const progress = segments > 1 ? activeIndex / (segments - 1) : 0;

      setMetrics({
        height: indicatorHeight,
        offset: maxOffset * progress,
      });
    };

    updateMetrics();

    const handleResize = (): void => {
      updateMetrics();
    };

    window.addEventListener('resize', handleResize, {passive: true});

    let observer: ResizeObserver | undefined;

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateMetrics);
      observer.observe(track);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, [activeIndex, stagesCount]);

  return [timelineRef, metrics] as [RefObject<HTMLDivElement>, TimelineMetrics];
};
