module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/messages': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
