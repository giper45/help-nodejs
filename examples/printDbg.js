const pd = require('../index.js').printDbg

console.log(require('../index.js'))


console.log(pd)
pd('error', null) 
pd(null, 'data')



