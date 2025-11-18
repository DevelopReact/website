import React, {FC} from 'react';

import {IIcon} from '../types/IIcon';

export const WorldIcon: FC<IIcon> = ({
  className = '',
  width = 420,
  height = 420,
  fill = '#000000',
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 420 420'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path stroke={fill} strokeWidth='26' d='M209 15a195 195 0 1 0 2 0z'></path>
    <path
      stroke={fill}
      strokeWidth='18'
      d='M210 15v390m195-195H15M59 90a260 260 0 0 0 302 0m0 240a260 260 0 0 0-302 0M195 20a250 250 0 0 0 0 382m30 0a250 250 0 0 0 0-382'
    ></path>
  </svg>
);
