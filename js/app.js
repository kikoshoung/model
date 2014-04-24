window.App = {
    helper: {
        regs: {
            email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            password: /^.{6,20}/,
        	name: /^[a-zA-Z0-9\s]{4,20}$/
        },
        bind: function(func, context) {
            var hasOrigBind = Function.prototype.bind;

            if (hasOrigBind) {
                return (func = func.bind(context));
            } else {
                return function() {
                    return (func = func.apply(context, arguments));
                }
            }
        },
        bindAll: function(obj) {
            var funcs = [].slice.call(arguments, 1);
            if (funcs.length) {
                for (var i = 0, len = funcs.length; i < len; i++) {
                    obj[funcs[i]] = helper.bind(obj[funcs[i]], obj);
                }
            }
        }
    },
    requsetErrorHandler: function() {
        throw (new Error('Request error...'));
    }
};