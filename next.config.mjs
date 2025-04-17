// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   experimental: { missingSuspenseWithCSRBailout: false },
//   transpilePackages: ["@distube/ytdl-core"],
//   webpack: (config, { isServer }) => {
//     // Add a specific rule just for the problematic files
//     config.module.rules.push({
//       test: /\.js$/,
//       include:
//         /node_modules\/@distube\/ytdl-core\/node_modules\/undici\/lib\/web\/fetch\/util\.js/,
//       use: {
//         loader: "babel-loader",
//         options: {
//           presets: ["@babel/preset-env"],
//           plugins: [
//             "@babel/plugin-proposal-class-properties",
//             "@babel/plugin-proposal-private-methods",
//           ],
//         },
//       },
//     });

//     return config;
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
  experimental: { missingSuspenseWithCSRBailout: false },
};

export default nextConfig;
