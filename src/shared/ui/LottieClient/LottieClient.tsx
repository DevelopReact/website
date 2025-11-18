'use client';

import cx from 'classnames';
import {useLottie} from 'lottie-react';
import React, {FC} from 'react';

import classes from './LottieClient.module.scss';
import {LottieClientProps} from './LottieClient.types';

export const LottieClient: FC<LottieClientProps> = ({animationData, className}) => {
  const {View} = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return <div className={cx(className, classes.wrapper)}>{View}</div>;
};
