import cx from 'classnames';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import React, {FC} from 'react';

import {Section} from '@features/Section';
import {Card, Container, Text} from '@shared/ui';

import {ENGINEERING_TECHNOLOGIES, IT_TECHNOLOGIES} from './constants';
import classes from './TechnologiesSection.module.scss';
import {TechnologiesSectionProps} from './TechnologiesSection.types';

export const TechnologiesSection: FC<TechnologiesSectionProps> = async ({className}) => {
  const t = await getTranslations('TechnologiesSection');

  return (
    <Section className={cx(className, classes.section)}>
      <Container className={classes.wrapper} size='small'>
        <Text.Title level={1} className={classes.sectionTitle}>
          {t('title')}
        </Text.Title>
        <div className={classes.categories}>
          <Card className={classes.categoryCard}>
            <Text.Title level={4} className={classes.categoryTitle}>
              {t('engineering')}
            </Text.Title>
            <div className={classes.technologiesList}>
              {ENGINEERING_TECHNOLOGIES.map((tech) => (
                <div key={tech.name} className={classes.technologyItem}>
                  <div className={classes.technologyIcon}>
                    <Image fill src={tech.logo} alt={tech.name} loading='lazy' />
                  </div>
                  <Text.Body level={4} className={classes.technologyName}>
                    {tech.name}
                  </Text.Body>
                </div>
              ))}
            </div>
          </Card>

          <Card className={classes.categoryCard}>
            <Text.Title level={4} className={classes.categoryTitle}>
              {t('it')}
            </Text.Title>
            <div className={classes.technologiesList}>
              {IT_TECHNOLOGIES.map((tech) => (
                <div key={tech.name} className={classes.technologyItem}>
                  <div className={classes.technologyIcon}>
                    <Image fill src={tech.logo} alt={tech.name} loading='lazy' />
                  </div>
                  <Text.Body level={4} className={classes.technologyName}>
                    {tech.name}
                  </Text.Body>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
