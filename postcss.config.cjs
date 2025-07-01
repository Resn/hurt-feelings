const path = require('path');

module.exports = {
  plugins: [
    require('postcss-inline-svg')({
      path: path.resolve(__dirname, 'src/')
    })
  ]
}
