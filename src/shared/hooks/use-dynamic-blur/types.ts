export type BlurMetrics = {
  lastLineX: number; // px от левого края элемента до конца последней видимой строки
  maskHeight: number; // px высота последней видимой строки (с учётом подрезки низом)
  isTruncated: boolean; // true, если текст переполнен
};
