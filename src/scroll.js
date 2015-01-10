var $ = require('jquery');
require('wheel');

var helper = {
    detect: function (node) {
        var result;
        var scrollTop, clientHeight;
        if (node === window || node === document) {
            scrollTop = $(document).scrollTop();
            node = document.documentElement;
        } else {
            scrollTop = node.scrollTop;
        }
        clientHeight = Math.ceil(node.clientHeight);
        if (scrollTop === 0) {
            result = node.scrollHeight > Math.ceil(clientHeight) ? 'top' : 'noscroll';
        } else if (scrollTop + Math.ceil(clientHeight) >= node.scrollHeight) {
            result = 'bottom';
        }
        return result;
    }
};

var r = {
    to: function (node, n, animateConfig) {
        node = $(node);
        var el = node[0];
        if (el === document || el === window || el === document.body) {
            node = $('html,body');
            el = node[0];
        }
        if (n === 'top') {
            n = 0;
        } else if (n === 'bottom') {
            n = el.scrollHeight;
        }
        if (n < 0) {
            n = el.scrollHeight + n;
        }
        if (animateConfig) {
            node.animate({
                scrollTop: n
            }, animateConfig);
        } else {
            node.scrollTop(n);
        }

    },
    /**
     * 处理鼠标滚轮冒泡
     * @param node
     * @param action
     */
    prevent: function (node, action) {
        node = node[0] || node;
        $(node).wheel(function (e, type, prevent, browser) {
            var result = helper.detect(node);
            if (node === e.target && (browser === 'ie' || result === 'noscroll' || (result === 'top' && type === 'up') || (result === 'bottom' && type === 'down'))) {
                prevent();
                if (action) {
                    action.call(node, e, result);
                }
            }
        });
    },
    listen: function (node, actions, prevent) {
        node = $(node);
        var el = node[0];
        var prevTop = node.scrollTop();
        var fn = function (e, dir) {
            if (dir) {
                var result = helper.detect(node);
                var top = node.scrollTop();
                status.bottom = (el === document ? document.body : el).scrollHeight - parseFloat((el === document) ? document.documentElement.clientHeight : el.clientHeight);
                if (actions.other) {
                    actions.other(e, top, dir, status);
                }
                if (result) {
                    if (actions.top) {
                        if (result === 'top' && dir === 'up') {
                            actions.top(e, top, dir, status);
                        }
                    }
                    if (actions.bottom) {
                        if (result === 'bottom' && dir === 'down') {
                            actions.bottom(e, top, dir, status);
                        }
                    }
                }
            }
        };
        el = (el === document || el === document.body) ? window : el; // IE下需要$(window).scroll可以监听，用document则不行
        $(el).scroll(function (e) {
            var scrollTop = node.scrollTop();
            var dir = scrollTop > prevTop ? 'down' : scrollTop < prevTop ? 'up' : '';
            prevTop = scrollTop;
            if (dir) {
                fn(e.originalEvent, dir);
            }
        });
        if (el !== window && prevent !== false) {
            r.prevent(el);
        }
    }
};

module.exports = r;
