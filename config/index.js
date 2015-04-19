var config = {
	app: {
		name: 'lcbo',
		version: '0.0.0',
		apiPath: '',
    defaultProductThumbUrl: '/images/no-image.png'
	},
  server: {
    port: 1234
  },
  lcboApi: {
    key: 'MDpkNjI4NzBkMi1lNmNkLTExZTQtYTVhYy1iYjhiNjE5YTUxYzE6UDZyN3dIV0RWcUk3NHRZdDllRjVxUWNOUHdZUjBjSGhTWjZI',
    path: 'http://lcboapi.com'
  }
};

var merge = require('merge');
var env = process.env[config.app.name + '_env'] || 'dev';

var exports = module.exports = merge(config, require('./config.' + env + '.js'));