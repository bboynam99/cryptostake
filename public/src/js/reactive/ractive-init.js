var _path_view = '/src/view';

var ractiveComponent = {};


var requireElement = function (param,paralel) {

    var name, _ver, el_selector, data;
    paralel = paralel || {
            cnt: 0, afterlast: function afterlast() {
            }
        };
    paralel.cnt++;

    if ('string' == typeof param) {
        throw new Error('[Ractive 001]: You have to specify a typeof param Ractive.requireElement');
    } else {
        name = param.name;
        _ver = param.ver || '1.0.0';
        el_selector = param.el_selector;
        // data = param.data || {};
        // data._e = _e;

    }

    if (!name) {
        throw new Error('[Ractive 002]: You have to specify a file/name Ractive.requireElement');
    }
    var cls = name+ '_cls';
    if (!Ractive.components[name]) {

        Ractive.require(_path_view + '/' + name + '/' + name + '.css?ver=' + _ver);

        Ractive.getHtml(_path_view + '/' + name + '/' + name + '.html?ver=' + _ver).then(function (template) {
            if (Ractive.DEBUG) console.log('Element ' + name + ' loaded');

            ractiveComponent[name + 'App'] = new Ractive({
                el: el_selector,
                template: template,
                data: {
                    _e: _e,
                },
                oninit: function oninit() {
                    this.on('setPage', function (e, v1, v2, v3) {
                        if (window.CryptoModel) CryptoModel.event[e.name] && CryptoModel.event[e.name](v1, v2, v3);
                    });
                },
                oncomplete: function oncomplete() {

                    Ractive.require(_path_view + '/' + name + '/' + name + '.js?ver=' + _ver).then(function () {

                        Ractive.components[name] = window[cls].extend({
                            template: template
                        });
                        ractiveComponent[cls] = new window[cls]();
                        paralel.cnt--;
                        setTimeout(function () {
                            if (0 >= paralel.cnt && !paralel.ran) {
                                paralel.ran = true;
                                paralel.afterlast(name);
                            }
                        }, 1);
                    });
                }
            });
        });
    } else {
        paralel.cnt--;
        if (0 >= paralel.cnt && !paralel.ran) {
            paralel.ran = true;
            paralel.afterlast(name);
        }
    }


};
Ractive.DEBUG_PROMISES = false;
window['requireElement'] = requireElement;

