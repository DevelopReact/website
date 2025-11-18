// react
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {FC} from 'react';

import {Text} from '@shared/ui';

import classes from './PostCard.module.scss';
import Calendar from '../../../../../public/images/blog/calendar_month.svg';
import Visibility from '../../../../../public/images/blog/visibility.svg';
// styles

interface PostCardProps {
  image: string;
  title: string;
  date: string;
  viewCount: string;
}

export const PostCard: FC<PostCardProps> = async ({image, title, date, viewCount}) => {
  const t = await getTranslations();

  const dateString = new Date(date);

  const day = dateString.toLocaleString('en-US', {day: '2-digit'});
  const month = dateString.toLocaleString('en-US', {month: 'short'});
  const year = dateString.getFullYear();

  const formatDate = `${day} ${month}, ${year}`;

  return (
    <div className={classes.card}>
      <Image fill className={classes.cardImage} src={image} alt={t(title)} loading='lazy' />
      <div className={classes.contentWrapper}>
        <Text.Body level={4} className={(classes.cardTitle, classes.cardBoldTitle)}>
          {t(title)}
        </Text.Body>
        <div className={classes.cardFooter}>
          <div className={classes.cardFooterWrap}>
            <Calendar />
            <Text.Body level={5} className={(classes.cardTitle, classes.cardLightTitle)}>
              {t(formatDate)}
            </Text.Body>
          </div>
          <div className={classes.cardFooterWrap}>
            <Visibility />
            <Text.Body level={5} className={(classes.cardTitle, classes.cardLightTitle)}>
              {t(viewCount)}
            </Text.Body>
          </div>
        </div>
      </div>
    </div>
  );
};
