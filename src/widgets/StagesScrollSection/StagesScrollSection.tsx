import cx from 'classnames';
import {getTranslations} from 'next-intl/server';
import React, {FC} from 'react';

import {Section} from '@features/Section';
import {Container} from '@shared/ui';
import {STAGES} from '@widgets/StagesSection/constants';

import {StagesScrollContent} from './components/StagesScrollContent';
import classes from './StagesScrollSection.module.scss';
import {StageItem, StagesScrollSectionProps} from './StagesScrollSection.types';

export const StagesScrollSection: FC<StagesScrollSectionProps> = async ({className}) => {
  const t = await getTranslations('StagesSection');

  const stages: StageItem[] = STAGES.map((stage, index) => ({
    index: index + 1,
    title: t(stage.title),
    description: t(stage.description),
    image: stage.icon,
  }));

  return (
    <Section className={cx(classes.section, className)}>
      <Container className={classes.wrapper} size='large'>
        <StagesScrollContent stages={stages} title={t('title')} />
      </Container>
    </Section>
  );
};
