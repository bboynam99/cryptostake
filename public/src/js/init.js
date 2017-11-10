var wt_chat = {
    status: true
};
var ractiveComponent = {};

(function ($, Ractive, wt_chat) {

    $(document).ready(function () {

        var requireElement = function (param, paralel) {
            paralel = paralel || {
                    cnt: 0, afterlast: function () {
                    }
                };
            paralel.cnt++;
            var name, _ver;
            if ('string' == typeof param) {
                name = param;
                param = {name: name, ver: '1.0.0'};
                _ver = '1.0.0';
            } else {
                name = param.name;
                _ver = param.ver || '1.0.0';

            }

            if (!name) {
                throw new Error('You have to specify a file/name Ractive.requireElement');
            }
            var src = param.src || name;
            name = name.split("/");
            var cls = name;
            name = 'Ractive-' + name.join('-');
            var fileName = cls[(cls.length - 1)].capitalizeFirstLetter();
            for (var i in cls)
                cls[i] = cls[i].capitalizeFirstLetter();
            cls = 'ractive-' + cls.join('');
            if (!Ractive.components[name]) {
                Ractive.require(_path_chat + src + '/' + fileName + '.min.css?ver=' + _ver);
                Ractive.getHtml(_path_chat + src + '/' + fileName + '.html?ver=' + _ver).then(function (template) {

                    if (Ractive.DEBUG) console.log('Element ' + name + ' loaded');


                    ractiveComponent[name ] = new Ractive({
                        el: param.element,
                        template: template,
                        data: {
                        },
                        oninit: function () {


                        },
                        oncomplete: function () {
                            Ractive.require(_path_chat + src + '/' + fileName + '.element.js?ver=' + _ver).then(function () {
                                Ractive.components[name] = window[cls].extend({
                                    template: template
                                });
                                ractiveComponent[cls] = new window[cls]();
                                paralel.cnt--;
                                setTimeout(function () {
                                    if (0 >= paralel.cnt && !paralel.ran) {
                                        paralel.ran = true;
                                        paralel.afterlast();
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
                    paralel.afterlast();
                }
            }

        };
        window['requireElement'] = requireElement;
        requireElement({name: 'App', ver: '1.3.0'});

    });
})(jQuery, Ractive, wt_chat);

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};