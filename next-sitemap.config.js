module.exports = {
  siteUrl: process.env.SITE_URL || 'https://turkiye.medicusstaufen.com/',
  generateRobotsTxt: true,
  exclude: ['/index', '/pano', '/hizmetlerimiz'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}
