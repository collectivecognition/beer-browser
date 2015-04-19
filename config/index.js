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
    key: 'MDpmOWMzNmQ3Mi1lNjlhLTExZTQtYTQxZi1hZmY0ODQ0OTUxZDU6NFMxQzhXS0VPY0ZHQXdneXRuWFg5QURuN2h0dmdPc2pQeGpR',
    path: 'http://lcboapi.com'
  }
};

var merge = require('merge');
var env = process.env[config.app.name + '_env'] || 'dev';

var exports = module.exports = merge(config, require('./config.' + env + '.js'));