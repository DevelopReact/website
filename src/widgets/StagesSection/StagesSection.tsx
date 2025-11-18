import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import React, {FC} from 'react';

import {Section} from '@features/Section';
import {Container, Text} from '@shared/ui';
import {Card} from '@shared/ui/Card';

import {ButtonWrapper} from './components/ButtonWrapper';
import {STAGES} from './constants';
import classes from './StagesSection.module.scss';
import {StagesSectionProps} from './StagesSection.types';

export const StagesSection: FC<StagesSectionProps> = async ({className}) => {
  const t = await getTranslations('StagesSection');

  return (
    <Section className={className} title={t('title')}>
      <Container className={classes.container}>
        <div className={classes.stagesGrid}>
          {STAGES.map((stage, index) => (
            <Card className={classes.stage} key={index}>
              <div className={classes.iconPlaceholder}>
                <Image src={stage.icon} alt={t(stage.title)} className={classes.icon} />
              </div>
              <Text.Title level={4} className={classes.stageTitle}>
                {index + 1}. {t(stage.title)}
              </Text.Title>
              <Text.Body level={3} className={classes.stageDescription}>
                {t(stage.description)}
              </Text.Body>
            </Card>
          ))}
        </div>
        <ButtonWrapper />
      </Container>
    </Section>
  );
};
