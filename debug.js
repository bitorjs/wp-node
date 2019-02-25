var babelConfig = require('./.babelrc');
require('@babel/register')(babelConfig.default || babelConfig);
require('./index.js');