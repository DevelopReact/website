import {ReactNode} from 'react';

import {SIZE} from './constants';

type Values<T> = T[keyof T];
type SizeType = Values<typeof SIZE>;

export interface ContainerProps {
  className?: string;
  children: ReactNode;
  size?: SizeType;
}
