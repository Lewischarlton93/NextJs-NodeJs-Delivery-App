/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("custom-env").env(process.env.APP_ENV, "./env-files", "dev");

const nextConfig = {};

module.exports = nextConfig;
