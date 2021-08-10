module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: {
    domain: process.env.REACT_APP_DOMAIN,
    insta_token: process.env.INSTA_TOKEN,
    react_app_domain: process.env.REACT_APP_API_URL,
    react_app_google_client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
  images: {
    domains: ['pedidopago-v2-prod.s3.sa-east-1.amazonaws.com',
      'pedidopago-static.s3-sa-east-1.amazonaws.com',
      'ppv2-development.s3.sa-east-1.amazonaws.com',
    ],
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
