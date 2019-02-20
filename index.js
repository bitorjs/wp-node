const babel = require('./.babelrc');
require('@babel/register')(babel);
require("./src/server");