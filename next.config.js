/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
// https://github.com/shadowwalker/next-pwa
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

module.exports = withPWA(
  withBundleAnalyzer({
    reactStrictMode: true,
    i18n,
    images: {
      remotePatterns: [
      ],
    },
  })
);
