'use client';

import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {FC, memo, useMemo, useLayoutEffect} from 'react';

import {Text} from '@shared/ui';

import {StageCard, Timeline, VisualFrame} from './components';
import {useStagesScroll, useTimelineMetrics, useViewportHeight} from './hooks';
import classes from './StagesScrollContent.module.scss';
import {StageItem} from '../../StagesScrollSection.types';

interface StagesScrollContentProps {
  stages: StageItem[];
  title: string;
}

const TOP_OFFSET = 12;
const BOTTOM_OFFSET = 12;

/* eslint-disable react/prop-types */
export const StagesScrollContent: FC<StagesScrollContentProps> = memo(({stages, title}) => {
  const stagesCount = stages.length;

  const availableHeight = useViewportHeight({
    topOffset: TOP_OFFSET,
    bottomOffset: BOTTOM_OFFSET,
  });

  const {activeIndex, containerRef, cardsRef, cardsViewportRef} = useStagesScroll({
    stagesCount,
    enabled: stagesCount > 0,
  });

  const [timelineRef, timelineMetrics] = useTimelineMetrics({
    activeIndex,
    stagesCount,
  });

  const activeStage = useMemo(
    () => (stagesCount > 0 && activeIndex < stagesCount ? stages[activeIndex] : null),
    [stages, activeIndex, stagesCount],
  );

  useLayoutEffect(() => {
    if (!containerRef.current || availableHeight <= 0) {
      return;
    }

    const container = containerRef.current;
    const heading = container.querySelector(`.${classes.heading}`);
    const headingHeight = heading ? heading.getBoundingClientRect().height : 0;
    const rowGap = parseFloat(getComputedStyle(container).rowGap) || 0;
    const paddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
    const paddingBottom = parseFloat(getComputedStyle(container).paddingBottom) || 0;

    // Вычисляем доступную высоту для контента (минус заголовок, отступы и gap)
    const contentHeight = availableHeight - headingHeight - rowGap - paddingTop - paddingBottom;

    container.style.setProperty('--available-height', `${availableHeight}px`);
    container.style.setProperty('--timeline-height', `${Math.max(0, contentHeight)}px`);

    // Обновляем ScrollTrigger после изменения размеров
    const timeoutId = setTimeout(() => {
      try {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      } catch (error) {
        // Игнорируем ошибки при обновлении, если ScrollTrigger еще не инициализирован
        console.warn('ScrollTrigger refresh error:', error);
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [availableHeight, containerRef]);

  if (stagesCount === 0) {
    return (
      <div className={classes.content}>
        <Text.Title level={2} className={classes.heading}>
          {title}
        </Text.Title>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={classes.content}>
      <Text.Title level={1} className={classes.heading}>
        {title}
      </Text.Title>

      <VisualFrame stage={activeStage} />

      <Timeline timelineRef={timelineRef} metrics={timelineMetrics} />

      <div className={classes.bodyColumn}>
        <div className={classes.panel}>
          <div ref={cardsViewportRef} className={classes.listViewport}>
            <div ref={cardsRef} className={classes.cards}>
              {stages.map((stage) => (
                <StageCard
                  key={stage.index}
                  stage={stage}
                  isActive={activeStage?.index === stage.index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
/* eslint-enable react/prop-types */

StagesScrollContent.displayName = 'StagesScrollContent';
