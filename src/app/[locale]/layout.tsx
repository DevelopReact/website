import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import {locales} from '@/config';
import {FormModal} from '@features/FormModal';
import {routing} from '@i18n/routing';
import {MODAL_PORTAL_ID} from '@shared/config/constants';
import {Footer} from '@widgets/Footer';
import {Header} from '@widgets/Header';

import type {Metadata} from 'next';

import '@shared/styles/globals.scss';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'SEO'});

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `/${locale}`,
      siteName: 'API BIM',
      type: 'website',
      locale,
    },
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'X-UA-Compatible': 'IE=edge',
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main className='global-container'>{children}</main>
          <Footer />
          <FormModal />
        </NextIntlClientProvider>
        <div id={MODAL_PORTAL_ID}></div>
      </body>
    </html>
  );
}
