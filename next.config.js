const webpack = (config, { isServer }) => {
  // Fixes npm packages that depend on `fs` module
  if (!isServer) {
    // eslint-disable-next-line no-param-reassign
    config.node = {
      fs: "empty",
    };
  }
  return config;
};

const settings = {
  pwa: {
    dest: "public",
  },
  images: {
    // domains: ["f000.backblazeb2.com"],
    imageSizes: [600, 960, 1280, 1920, 3440],
    deviceSizes: [600, 960, 1280, 1920, 3440],
  },
  webpack,
  async headers() {
    return [
      {
        source: "/(.*?)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Feature-Policy",
            value: "geolocation 'none'",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = settings;

/** ----
 * I've turned the service worker off for now.  Will add back in
 * when I have a better understanding of it.
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

// https://github.com/GoogleChrome/workbox/issues/1790#issuecomment-602678031
// this ternary is to get rid of the warning:
// GenerateSW has been called multiple times, perhaps due to running webpack in --watch mode. The precache manifest generated after the first call may be inaccurate! Please see https://github.com/GoogleChrome/workbox/issues/1790 for more information.

const exportSettings =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
module.exports = exportSettings;
 */
