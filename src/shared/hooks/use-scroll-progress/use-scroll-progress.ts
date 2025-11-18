import {useEffect, useState} from 'react';

export const useScrollProgress = (): number => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, scrollTop / scrollableHeight));
      setScrollProgress(progress);
    };

    calculateScrollProgress();

    window.addEventListener('scroll', calculateScrollProgress, {passive: true});
    window.addEventListener('resize', calculateScrollProgress, {passive: true});

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return scrollProgress;
};
