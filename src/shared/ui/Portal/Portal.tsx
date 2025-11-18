'use client';

import React, {useRef, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

export interface PortalProps {
  selector: string;

  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({selector, children}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLDivElement;

    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current as HTMLDivElement) : null;
};
