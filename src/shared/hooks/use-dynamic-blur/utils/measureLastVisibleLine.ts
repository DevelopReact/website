import {BlurMetrics} from '../types';

export const measureLastVisibleLine = (el: HTMLElement): BlurMetrics => {
  // нет DOM или неполный Range API (jsdom) - В основном в тестах
  //TODO: убрать эту проверку
  if (
    typeof document === 'undefined' ||
    !document.createRange ||
    typeof document.createRange()?.getClientRects !== 'function'
  ) {
    return {lastLineX: 0, maskHeight: 0, isTruncated: false};
  }

  const elRect = el.getBoundingClientRect();
  // Вся текстовая разметка элемента
  const range = document.createRange();

  range.selectNodeContents(el);

  const allRects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);

  if (!allRects.length) {
    return {lastLineX: 0, maskHeight: 0, isTruncated: false};
  }

  // Нижняя видимая граница (элемент может быть «подрезан» overflow:hidden/max-height)
  const visibleTop = elRect.top;
  const visibleBottom = elRect.bottom;

  // Оставляем только полностью/частично видимые строки
  const visibleRects = allRects.filter(
    (r) => r.bottom > visibleTop + 0.5 && r.top < visibleBottom - 0.5,
  );

  const last = (visibleRects.length ? visibleRects : allRects)[
    (visibleRects.length ? visibleRects : allRects).length - 1
  ];

  // Координаты последней видимой строки, обрезаем по границам элемента
  const lineTop = Math.max(last.top, visibleTop);
  const lineBottom = Math.min(last.bottom, visibleBottom);
  const maskHeight = Math.max(0, lineBottom - lineTop);

  // Правая точка текста внутри этой строки относительно левого края элемента
  // Важно: учитываем подрезку справа (если есть clip/overflow контейнера)
  const lineRight = Math.min(last.right, elRect.right);
  const lastLineX = Math.max(0, lineRight - elRect.left);

  // 1) Скрытые строки есть?
  const hiddenLines = allRects.length > visibleRects.length + 0; // 0 — на случай отсутствия line-clamp

  // 2) Вертикальное переполнение (max-height / clamp)
  const verticalOverflow = el.scrollHeight - el.clientHeight > 0.5; // с допуском на субпиксели

  // 3) Горизонтальное (однострочное) переполнение
  const horizontalOverflow = el.scrollWidth - el.clientWidth > 0.5;

  const isTruncated = hiddenLines || verticalOverflow || horizontalOverflow;

  return {lastLineX, maskHeight, isTruncated};
};
