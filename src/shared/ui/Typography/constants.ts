export const OVERFLOW_TYPES = {
  ELLIPSIS: 'ellipse',
  BLUR: 'blur',
  NONE: 'none',
} as const;

/* ширина затухания */
export const DEFAULT_FADE = 32;
/* высота нижнего слоя = высота последней строки */
export const DEFAULT_MASK_HEIGHT = 0;
/* длина последней видимой строки от левого края элемента */
export const DEFAULT_LAST_LINE_X = '100%';
/* 1, если текст переполнен и нужен блюр */
export const DEFAULT_BLUR_ENABLED = '0';
