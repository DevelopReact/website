// react
import cx from 'classnames';
import {getTranslations} from 'next-intl/server';
import {FC} from 'react';

import {Section} from '@features/Section';
import {Container, Divider} from '@shared/ui';
import {Text} from '@shared/ui/Text';

import classes from './BlogSection.module.scss';
import {BlogSectionProps} from './BlogSection.types';
import {MainPostCard} from './components/MainPostCard/MainPostCard';
import {PostCard} from './components/PostCard/PostCard';
import {BLOG_SHOWCASE} from './constants';

// styles

export const BlogSection: FC<BlogSectionProps> = async ({className}) => {
  const t = await getTranslations('Blog');
  const title = t.rich('title', {
    em: (chunks) => <span className={classes.titleHighlight}>{chunks}</span>,
  });
  return (
    <Section className={cx(classes.section, classes.wrapperBlog, className)}>
      <Text.Title level={1} className={classes.title}>
        {title}
      </Text.Title>
      <Divider align='left' />
      <Container className={classes.wrapper} size='large'>
        <div className={classes.header}></div>

        <div className={classes.cards}>
          {BLOG_SHOWCASE.map((item, index) =>
            index === 0 ? (
              <div key={index} className={classes.mainPostCard}>
                <MainPostCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ) : (
              <div key={index} className={classes.card}>
                <PostCard
                  title={item.title}
                  image={item.image}
                  viewCount={item.viewCount}
                  date={item.date}
                />
              </div>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
};
