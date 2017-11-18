'use strict'
function createScroll(settionScroll) {
    var keys = [];
    for (var key in settionScroll) {
        createSctollOne(settionScroll[key],key)
    }
}

function createSctollOne(param,key) {
        var defaultOptionsScroll = {
            axis: "y",
            theme: "dark",
            // setHeight: 'auto',
            callbacks: {
                onCreate: function () {
                    var obj = this;
                    window[key] ={
                        selector: param.selector,
                        dom_element: obj,
                        dom_content: obj.querySelector('.mCSB_container'),
                        element: $(obj),
                        content: $(obj.querySelector('.mCSB_container'))
                    };
                    param.callbacks.create && param.callbacks.create(null,true);
                    console.log('mCustomScrollbar: [onCreate] $("' + param.selector + '")');

                },
                onInit: function () {
                    param.callbacks.init && param.callbacks.init(null,true);
                    console.log('mCustomScrollbar: [onInit] $("' + param.selector + '")');
                }
            }
        };
        for (var keyOpt in param.options) {
            if (param.options.hasOwnProperty(keyOpt)) {
                defaultOptionsScroll[keyOpt] = param.options[keyOpt];
            }
        }
        $(param.selector).mCustomScrollbar(defaultOptionsScroll);
}