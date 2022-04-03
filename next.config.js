module.exports = {
    async rewrites() {
      return [
        {
            source: '/api/:path*',
            has: [
                {
                  type: 'header',
                  key: 'x-rewrite-me',
                },
              ],
            destination: `https://184.105.241.124:30004/api/23bc46b1-71f6-4ed5-8c54-816aa4f8c502/xuanlinhha/:path*`,
        },
      ]
    },
  }