define(function (require, exports, module) {
    var _ = require('underscore');
    var events = {};
    var eventApi = {
        listen: function (key, fn) {
            if (!_.isString(key) || !_.isFunction(fn)) {
                throw '监听事件参数错误';
                return;
            }
            if (!_.isArray(events[key])) {
                throw key + ' 事件未注册';
                return;
            }
            events[key].push(fn);
        },
        trigger: function () {
            var key = arguments[0];
            var args = [].slice.call(arguments, 1);
            var fnList = events[key] || [];
            _.each(fnList, function (item) {
                if (_.isFunction(item)) {
                    item.apply(window, args);
                } else {
                    console.error(e + ': ' + key + '监听事件执行出错');
                }
            });
        },
        register: function (namespace, key) {
            if (!_.isString(namespace) || !_.isString(key)) {
                throw '注册事件参数错误';
                return;
            };
            if (!/^[a-z\-]*$/g.test(namespace + key)) {
                throw '注册事件命名只能为小写字母和"-"';
                return;
            }

            events[namespace + ':' + key] = events[namespace + key] || [];
            return namespace + ':' + key;
        }
    };
    module.exports = eventApi;
});