module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  env: {
    CRM_TOKEN: process.env.CRM_TOKEN,
    SITE_URL: process.env.SITE_URL,
  },
};
