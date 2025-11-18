import React, {FC} from 'react';

import {IIcon} from '../types/IIcon';

export const CloseIcon: FC<IIcon> = ({
  className = '',
  width = 16,
  height = 16,
  fill = '#E0E0E0',
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path stroke={fill} d='m1 1 14 14M15 1 1 15'></path>
  </svg>
);
