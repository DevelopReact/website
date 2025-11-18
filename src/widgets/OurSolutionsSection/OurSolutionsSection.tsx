import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import React, {FC} from 'react';

import {Section} from '@features/Section';
import {Button, Card, Container, Text} from '@shared/ui';

import {OUR_SOLUTIONS} from './constants';
import classes from './OurSolutionsSection.module.scss';
import {OurSolutionsSectionProps} from './OurSolutionsSection.types';

export const OurSolutionsSection: FC<OurSolutionsSectionProps> = async ({className}) => {
  const t = await getTranslations('OurSolutionsSection');

  return (
    <Section className={className} title={t('title')}>
      <Container className={classes.container}>
        <div className={classes.items}>
          {OUR_SOLUTIONS.map((item) => (
            <Card key={item.title} className={classes.item}>
              <div className={classes.iconPlaceholder}>
                <Image fill src={item.icon} alt={item.title} />
              </div>
              <Text.Body level={3} className={classes.itemTitle}>
                {t(item.title)}
              </Text.Body>
              <Button size='medium' className={classes.btn}>
                {t('btn')}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
