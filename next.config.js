/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// module.exports = () => {
//   const rewrites = async () => {
//     return [
//       {
//         source: '/api/*',
//         destination: 'http://localhost:5000/*',
//       },
//     ];
//   };
//   return {
//     rewrites,
//   };
// };
