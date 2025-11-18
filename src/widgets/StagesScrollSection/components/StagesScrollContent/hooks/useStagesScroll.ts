import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useRef, useState} from 'react';

import type {RefObject} from 'react';

gsap.registerPlugin(ScrollTrigger);

export interface UseStagesScrollParams {
  stagesCount: number;
  enabled?: boolean;
}

export interface UseStagesScrollReturn {
  activeIndex: number;
  containerRef: RefObject<HTMLDivElement | null>;
  cardsRef: RefObject<HTMLDivElement | null>;
  cardsViewportRef: RefObject<HTMLDivElement | null>;
}

const BREAKPOINT = '(min-width: 768px)';

export const useStagesScroll = ({
  stagesCount,
  enabled = true,
}: UseStagesScrollParams): UseStagesScrollReturn => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const matchMediaRef = useRef<gsap.MatchMedia | null>(null);

  useEffect(() => {
    if (!enabled || stagesCount === 0) {
      return;
    }

    const container = containerRef.current;
    const cards = cardsRef.current;
    const viewport = cardsViewportRef.current;

    if (!container || !cards || !viewport) {
      return;
    }

    const mm = gsap.matchMedia();
    matchMediaRef.current = mm;

    mm.add(BREAKPOINT, () => {
      const getHeaderHeight = (): number => {
        const header = document.querySelector('header');
        return header ? header.offsetHeight : 0;
      };

      const getScrollDistance = (): number => {
        return Math.max(0, cards.scrollHeight - viewport.clientHeight);
      };

      const distance = getScrollDistance();

      if (distance <= 0) {
        gsap.set(cards, {y: 0});
        setActiveIndex(0);
        return;
      }

      const animation = gsap.to(cards, {
        y: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: () => {
            const headerHeight = getHeaderHeight();
            const delta = 12;
            return `top top+=${headerHeight + delta}`;
          },
          end: () => `+=${getScrollDistance() + viewport.clientHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const nextIndex = Math.min(stagesCount - 1, Math.round(progress * (stagesCount - 1)));
            setActiveIndex(nextIndex);
          },
        },
      });

      animationRef.current = animation;
      scrollTriggerRef.current = animation.scrollTrigger || null;

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
        if (animationRef.current) {
          animationRef.current.kill();
          animationRef.current = null;
        }
      };
    });

    return () => {
      // Сначала убиваем ScrollTrigger, чтобы вернуть элементы в исходное состояние
      if (scrollTriggerRef.current) {
        try {
          scrollTriggerRef.current.kill();
        } catch {
          // Игнорируем ошибки при очистке
        }
        scrollTriggerRef.current = null;
      }
      if (animationRef.current) {
        try {
          animationRef.current.kill();
        } catch {
          // Игнорируем ошибки при очистке
        }
        animationRef.current = null;
      }
      // Затем откатываем matchMedia
      if (matchMediaRef.current) {
        try {
          matchMediaRef.current.revert();
        } catch {
          // Игнорируем ошибки при очистке
        }
        matchMediaRef.current = null;
      }
      setActiveIndex(0);
    };
  }, [stagesCount, enabled]);

  return {
    activeIndex,
    containerRef,
    cardsRef,
    cardsViewportRef,
  };
};
