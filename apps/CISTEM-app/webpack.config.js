const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../packages/ui'),
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
        stats: {
          errorDetails: true,
        },        
      },
    ],
  },
  resolve:{
    fallback:{
      "url": require.resolve("url/"),
      "path": require.resolve('path-browserify'),
      "fs": require.resolve('fs'),
    }
  }
};