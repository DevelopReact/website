import {useLayoutEffect, useState} from 'react';

interface UseViewportHeightParams {
  topOffset?: number;
  bottomOffset?: number;
}

export const useViewportHeight = ({
  topOffset = 0,
  bottomOffset = 0,
}: UseViewportHeightParams = {}): number => {
  const [availableHeight, setAvailableHeight] = useState(() => {
    if (typeof window === 'undefined') {
      return 0;
    }
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const viewportHeight = window.innerHeight;
    return Math.max(0, viewportHeight - headerHeight - topOffset - bottomOffset);
  });

  useLayoutEffect(() => {
    const calculateHeight = (): void => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      const height = viewportHeight - headerHeight - topOffset - bottomOffset;

      setAvailableHeight(Math.max(0, height));
    };

    // Небольшая задержка для того, чтобы DOM успел отрендериться
    const timeoutId = setTimeout(calculateHeight, 0);

    window.addEventListener('resize', calculateHeight, {passive: true});

    const header = document.querySelector('header');
    let observer: ResizeObserver | undefined;

    if (header && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(calculateHeight);
      observer.observe(header);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateHeight);
      observer?.disconnect();
    };
  }, [topOffset, bottomOffset]);

  return availableHeight;
};
