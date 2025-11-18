// react
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {FC} from 'react';

import {Button, Text} from '@shared/ui';

// styles
import classes from './MainPostCard.module.scss';

interface MainPostCardProps {
  image: string;
  title: string;
  description: string;
}

export const MainPostCard: FC<MainPostCardProps> = async ({image, title, description}) => {
  const t = await getTranslations();

  return (
    <div className={classes.mainPostCard}>
      <Image fill className={classes.cardImage} src={image} alt={t(title)} loading='lazy' />
      <article className={classes.cardBlurContent}>
        <div className={classes.contentWrapper}>
          <Text.Body level={1} className={classes.cardTitle}>
            {t(title)}
          </Text.Body>
          <Text.Body level={3} className={classes.cardDescription}>
            {t(description)}
          </Text.Body>
        </div>
        <Button size='large' className={classes.btn}>
          {t('readMore')}
        </Button>
      </article>
    </div>
  );
};
