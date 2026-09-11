/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // If your GitHub Pages URL is https://USERNAME.github.io/pinoycare-ch/
  // (i.e. you do NOT have a custom domain), uncomment the two lines below
  // and replace 'pinoycare-ch' with your exact repo name:
  //
  // basePath: '/pinoycare-ch',
  // assetPrefix: '/pinoycare-ch/',
};

module.exports = nextConfig;
