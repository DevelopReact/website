import cx from 'classnames';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import React, {FC} from 'react';

import {Section} from '@features/Section';
import {Container} from '@shared/ui';
import {Text} from '@shared/ui/Text';

import {OUR_SOLUTIONS_SHOWCASE} from './constants';
import classes from './OurSolutionsShowcaseSection.module.scss';
import {OurSolutionsShowcaseSectionProps} from './OurSolutionsShowcaseSection.types';

export const OurSolutionsShowcaseSection: FC<OurSolutionsShowcaseSectionProps> = async ({
  className,
}) => {
  const t = await getTranslations('OurSolutionsSection');
  const title = t.rich('title', {
    em: (chunks) => <span className={classes.titleHighlight}>{chunks}</span>,
  });

  return (
    <Section className={cx(classes.section, className)}>
      <Container className={classes.wrapper} size='large'>
        <div className={classes.header}>
          <Text.Title level={1} className={classes.title}>
            {title}
          </Text.Title>
        </div>

        <div className={classes.cards}>
          {OUR_SOLUTIONS_SHOWCASE.map((item) => (
            <article key={item.title} className={classes.card}>
              <Image
                fill
                className={classes.cardImage}
                src={item.image}
                alt={t(item.title)}
                loading='lazy'
              />
              <Text.Body level={3} className={classes.cardTitle}>
                {t(item.title)}
              </Text.Body>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
};
