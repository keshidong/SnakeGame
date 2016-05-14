define(function(require, exports, module) {
    var obj = require('./test.js');
    obj.a = 2;
    console.log('testa:' + 'a = ' + obj.a);
});