var $ = require('component/jquery@1.0.0');
require('gazira/easing@master');
var Scroll = require('../index');

$(function () {
    var body = window;
    $('#body_to_top').click(function() {
        Scroll.to(body, 'top');
    });

    $('#body_to_bottom').click(function() {
        Scroll.to(body, 'bottom', {
            duration: 'slow',
            easing: 'bounceOut'
        });
    });

    $('#body_to_top_500').click(function() {
        Scroll.to(body, 500);
    });

    $('#body_to_bottom_500').click(function() {
        Scroll.to(body, -500);
    });

    var box = $('#box');
    $('#box_to_top').click(function() {
        Scroll.to(box, 'top');
    });

    $('#box_to_top_500').click(function() {
        Scroll.to(box, 500);
    });

    $('#box_to_bottom').click(function() {
        Scroll.to(box, 'bottom');
    });

    $('#box_to_bottom_500').click(function() {
        Scroll.to(box, -500, {
            duration: 'slow',
            easing: 'bounceOut'
        });
    });

    Scroll.prevent(box);

    Scroll.listen(box, {
        top: function() {
            console.log('top');
        },
        bottom: function() {
            console.log('bottom');
        }
    });
});
