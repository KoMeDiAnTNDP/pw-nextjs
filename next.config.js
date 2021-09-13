/** @type {import('next').NextConfig} */
const withImages = require('next-images');

withImages.reactStrictMode = true;

module.exports = {
  ...withImages,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
};
