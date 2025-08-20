/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://skalgpt.vercel.app',
  generateRobotsTxt: false, // We have a custom robots.ts
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/chat/*',
    '/admin/*',
    '/private/*',
  ],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/auth/login'),
    await config.transform(config, '/auth/register'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/chat/*', '/_next/', '/admin/', '/private/'],
      },
    ],
  },
}