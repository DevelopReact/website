'use client';

import cn from 'classnames';
import {type CSSProperties, forwardRef, JSX, useRef} from 'react';

import {useDynamicBlur} from '@shared/hooks';
import {mergeRefs} from '@shared/utils';

import {
  DEFAULT_BLUR_ENABLED,
  DEFAULT_FADE,
  DEFAULT_LAST_LINE_X,
  DEFAULT_MASK_HEIGHT,
  OVERFLOW_TYPES,
} from './constants';
import classes from './Typography.module.scss';
import {TypographyProps} from './Typography.types';

export const Typography = forwardRef<HTMLElement, TypographyProps<keyof JSX.IntrinsicElements>>(
  (
    {
      id,
      className,
      tagName: Component = 'span',
      children,
      countLines = 1,
      overflow = OVERFLOW_TYPES.NONE,
    },
    ref,
  ) => {
    const refElement = useRef<HTMLElement>(null);

    useDynamicBlur(refElement, [children, countLines]);

    const overflowClassName = cn(classes.overflow, classes[`overflow_${overflow}`]);

    const typographyClassName = cn(className, {
      [overflowClassName]: overflow !== OVERFLOW_TYPES.NONE,
    });

    const styleOverflowVars = {
      '--lines': String(countLines),
      '--fade': `${DEFAULT_FADE}px`,
      '--mask-height': `${DEFAULT_MASK_HEIGHT}px`,
      '--last-line-x': DEFAULT_LAST_LINE_X,
      '--blur-enabled': DEFAULT_BLUR_ENABLED,
    } as CSSProperties;

    return (
      // @ts-expect-error: Type 'SVGSymbolElement' is missing the following properties from type 'HTMLElement'
      <Component
        // @ts-expect-error: Expression produces a union type that is too complex to represent
        ref={mergeRefs(ref, refElement)}
        id={id}
        className={typographyClassName}
        style={styleOverflowVars}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = 'Typography';
