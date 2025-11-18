import {DependencyList, RefObject, useLayoutEffect} from 'react';

import {measureLastVisibleLine} from './utils';

export const useDynamicBlur = (ref: RefObject<HTMLElement | null>, deps: DependencyList = []) => {
  useLayoutEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const apply = () => {
      const {lastLineX, maskHeight, isTruncated} = measureLastVisibleLine(el);

      el.style.setProperty('--last-line-x', `${lastLineX}px`);
      el.style.setProperty('--mask-height', `${maskHeight}px`);
      el.style.setProperty('--blur-enabled', isTruncated ? '1' : '0');
    };

    apply();

    // Реагируем на ресайз, изменение размеров/шрифтов и контента
    const resizeObserver = new ResizeObserver(apply);

    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(apply);

    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    window.addEventListener('resize', apply);
    const raf = requestAnimationFrame(apply); // подстрахуемся после первой раскладки

    return () => {
      window.removeEventListener('resize', apply);
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
