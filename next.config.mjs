/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Temporarily disabled so the real home page serves at "/" while you work on it.
  // Re-enable this to gate the site behind the coming-soon splash again.
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: '/',
  //         destination: '/coming-soon',
  //       },
  //     ],
  //   }
  // },
}

export default nextConfig
