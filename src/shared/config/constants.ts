export const MODAL_PORTAL_ID = 'MODAL_PORTAL_ID';

/**  ▸ перевод кадров → секунды
 *    10 кадров ≈ 0.17 с   (scale-in / opacity-in)
 *    15 кадров ≈ 0.25 с   (scale-out / opacity-out)
 */
export const EASE_IN: [number, number, number, number] = [0.56, 0.0, 0.05, 1.0];
export const EASE_OUT: [number, number, number, number] = [0.31, 0.0, 0.05, 1.0];

/* ---------- анимации ---------- */
export const enterVariants = {
  offscreen: {opacity: 0, y: 20},
  onscreen: {opacity: 1, y: 0},
};

export const clickVariants = {
  rest: {scale: 1, transition: {duration: 0.25, ease: EASE_OUT}},
  hover: {scale: 0.95, transition: {duration: 0.17, ease: EASE_IN}},
};

export const gradientVariants = {
  rest: {opacity: 0, scale: 0.95, transition: {duration: 0.25, ease: EASE_OUT}},
  hover: {opacity: 1, scale: 1, transition: {duration: 0.17, ease: EASE_IN}},
};

export const NAVIGATION_LINKS = {
  SERVICES: '/services',
  CASE_STUDIES: '/case-studies',
  PRODUCTS: '/products',
  BLOG: '/blog',
  ABOUT_US: '/about_us',
} as const;
