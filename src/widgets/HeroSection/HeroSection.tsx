import cx from 'classnames';
import {getTranslations} from 'next-intl/server';
import {FC} from 'react';

import {Section} from '@features/Section';
import {Container} from '@shared/ui/Container';
import {Text} from '@shared/ui/Text';

import {ButtonWrapper} from './components/ButtonWrapper';
import classes from './HeroSection.module.scss';
import {HeroSectionProps} from './HeroSection.types';

export const HeroSection: FC<HeroSectionProps> = async ({className}) => {
  const t = await getTranslations('HeroSection');

  return (
    <Section className={cx(className, classes.wrapper)}>
      <Container className={classes.container}>
        <div className={classes.content}>
          <Text.Title level={1} className={classes.title}>
            {t.rich('title', {
              green: (chunks) => <span className={classes.green}>{chunks}</span>,
              red: (chunks) => <span className={classes.red}>{chunks}</span>,
            })}
          </Text.Title>
          <Text.Body level={2} className={classes.subtitle}>
            {t('subtitle')}
          </Text.Body>
          <ButtonWrapper className={classes.buttonWrapper} />
        </div>
        <div className={classes.mediaWrapper}>
          <div className={classes.media}>
            <video loop muted autoPlay className={classes.video}>
              <source src='/videos/video-homepage-small.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </Container>
    </Section>
  );
};
