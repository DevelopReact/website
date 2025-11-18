import {CommonTypographyProps} from '../Typography';
import {TEXT_COLOR_TYPES, TEXT_LEVELS, TEXT_STATE_TYPES} from './constants';

type Values<T> = T[keyof T];

export type TextColorType = Values<typeof TEXT_COLOR_TYPES>;
export type TextStateType = Values<typeof TEXT_STATE_TYPES>;

export type Level = Values<typeof TEXT_LEVELS>;

export type TextProps = CommonTypographyProps & {
  /**
   * Уровень заголовка
   */
  level: Level;
  /**
   * Основной цвет текста
   */
  color?: TextColorType;
  /**
   * Цвет состояния текста
   */
  state?: TextStateType;
};
