import cx from 'classnames';
import React, {FC} from 'react';

import {Container} from '@shared/ui';
import {Text} from '@shared/ui/Text';

import classes from './Section.module.scss';
import {SectionProps} from './Section.types';

export const Section: FC<SectionProps> = ({className, title, children}) => {
  return (
    <section className={cx(className, classes.wrapper)}>
      {title && (
        <Container>
          <Text.Title level={1} className={classes.title}>
            {title}
          </Text.Title>
        </Container>
      )}
      {children}
    </section>
  );
};
