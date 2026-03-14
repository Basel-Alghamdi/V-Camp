const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@owners-platform/ui",
    "@owners-platform/types",
    "@owners-platform/validators",
  ],
};

module.exports = withNextIntl(nextConfig);
