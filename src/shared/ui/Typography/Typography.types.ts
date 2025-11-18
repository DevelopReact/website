import {ReactNode, JSX} from 'react';

import {OVERFLOW_TYPES} from './constants';

type Values<T> = T[keyof T];
export type OverflowType = Values<typeof OVERFLOW_TYPES>;

export type CommonTypographyProps = {
  /**
   * Максимальное количество строк текста
   * @default 1
   */
  countLines?: number;
  /**
   * Управление переполнением текста
   * @default "none"
   */
  overflow?: OverflowType;
  /**
   * Идентификатор элемента
   */
  id?: string;
  /**
   * Пользовательское имя класса
   */
  className?: string;
  /**
   * Содержимое типографии
   */
  children: ReactNode;
};

export type TypographyProps<T extends keyof JSX.IntrinsicElements> = CommonTypographyProps & {
  /**
   * Html тег типографии
   * @default span
   */
  tagName?: T;
};
