if (process.env.NODE_ENV === 'production') {
  modules.exports = require('./prod');
} else {
  modules.exports = require('./dev');
}
