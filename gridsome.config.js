module.exports = {
  siteName: 'Google APIs Tester',
  siteDescription: 'A starter project for Gridsome with Bootstrap and Google APIs',
  siteUrl: 'https://gridsome-starter-bootstrap.loke.dev',
  plugins: [
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: process.env.GOOGLE_SHEET_ID,
        apiKey: process.env.GRIDSOME_GOOGLE_API_KEY,
        type: 'googleSheet'
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-72659574-10'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    }
  ],
  css: {
    loaderOptions: {
      scss: {
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
}
