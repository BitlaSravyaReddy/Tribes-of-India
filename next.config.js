/** @type {import('next').NextConfig} */

const { i18n }= require('./next-i18next.config');
const withTM = require('next-transpile-modules')([
  '@genkit-ai/core',
  'dotprompt',
  'handlebars'
]);
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  

    images: {
      domains: [
        'lh4.googleusercontent.com',
        'images.pexels.com',
        'preview.redd.it',
      ],
      loader: 'custom',
      loaderFile: './custom-image-loader.js',
    


    

     






    
  },
}

module.exports = nextConfig
