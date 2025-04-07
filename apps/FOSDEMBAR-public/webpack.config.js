const path = require('path');

module.exports = {
  resolve:{
    fallback:{
      "url": require.resolve("url/"),
      "path": require.resolve('path-browserify'),
      "fs": require.resolve('fs'),
    }
  }
};