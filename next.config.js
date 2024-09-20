const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ["cdnjs.cloudflare.com"],
  },
  env: {
    NEXT_PUBLIC_GA_ID: "your_google_analytics_tracking_id",
  },
};
