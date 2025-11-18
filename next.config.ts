import path from 'path';

import createNextIntlPlugin from 'next-intl/plugin';

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `@use "shared/styles/_global-import" as *;`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
