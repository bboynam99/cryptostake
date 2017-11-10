'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var opionsSocket =  location.origin.replace('http','ws').replace('https','wss') + '/';
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var SocketClass = function () {
    function SocketClass(options, param) {
        _classCallCheck(this, SocketClass);

        this.options = options;
        this.socket = {};
        this.forker = {};
        this.wsOpen = false;
        this.countSocketConnect = 0;
        this.paramWS = "";
        this.deleyConnect = [500, 2000, 4000, 6000, 10000, +(Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000)];
        for (var key in param) {
            if (param.hasOwnProperty(key)) this.paramWS += "&" + key + "=" + param[key];
        }
        this.paramWS = this.paramWS.replace('&', "?");
        this.start();
    }

    _createClass(SocketClass, [{
        key: 'close',
        value: function close() {
            // if (this.ws.wsOpen) this.ws.close();
            console.log("клиент хочет закрыть сойденение с  сервером ");
        }
    }, {
        key: 'onopen',
        value: function onopen() {
            console.log("[WSS] Соединение установлено.");
            this.wsOpen = true;
            this.countSocketConnect = 0;
        }
    }, {
        key: 'onclose',
        value: function onclose(event) {
            this.wsOpen = false;

            setTimeout(function () {
                if (this.countSocketConnect < 5) this.countSocketConnect++;
                this.start();
            }.bind(this), this.deleyConnect[this.countSocketConnect]);
            console.log('[WSS] Обрыв соединения'); // например, "убит" процесс сервера
        }
    }, {
        key: 'onmessage',
        value: function onmessage(data) {
            try {
                var object = JSON.parse(data.data);
            } catch (e) {
                console.warn('[WSS] onmessage No valid JSON:\n\t', data);
            }

            console.log(object);
              if (object && object.event && onEmiter.hasOwnProperty(object.event)) {
                if (object.data) {
                    console.log(onEmiter,object);
                    onEmiter[object.event](object.data);
                } else {
                    onEmiter[object.event]();
                }
            } else if (object && object.event && socket.forker.hasOwnProperty(object.event)) {
                  if (object.data) {
                      socket.forker[object.event](object.data);
                  } else {
                      socket.forker[object.event]();
                  }

              }else console.warn("[WSS] Warn onEmiter(event) \n\tObject: ", object);
        }
    }, {
        key: 'start',
        value: function start() {
            // this.close.bind(this)();

            this.socket = new WebSocket(this.options, ["soap", "wamp"]);
            this.socket.onopen = this.onopen;
            this.socket.onmessage = this.onmessage;
            this.socket.onerror = console.error;
            this.socket.onclose = this.onclose;
        }
    }, {
        key: 'emit',
        value: function emit(data) {
            try {
                if (this.socket.wsOpen) {
                    this.socket.send(data);
                }
            } catch (e) {
                console.warn('[WSS] EMIT No valid connect:,', e, '\n\t', data);
            }
        }
    }, {
        key: 'on',
        value: function on(name, fn) {
            this.forker[name] = fn;
        }
    }]);

    return SocketClass;
}();

var socket = new SocketClass(opionsSocket);

socket.on('connected', function () {
    console.log('WebSocet connected successfull');
});
var authData = null;
socket.on('auth', function (res) {
    authData = res;
    requireElement({name: "Auth", ver: "1.0.0", el_selector: "#blockAuth"});
});
var onEmiter = {};
function Emit(json) {
    try {
        var str = JSON.stringify(json);

        socket.emit(str);
    } catch (e) {
        console.warn('[WSS] EMIT No valid JSON:,', e, '\n\t', json);
    }
}
function API(method, param, _public, cb, reset_cb) {
    if (!method || typeof method != 'string' || method == '')
        return console.error('[API] error emit ,', method, param, _public);


    if (typeof _public == 'function') {
        reset_cb = cb;
        cb = _public;
        _public = false
    }
    if (_public) {
        Emit({event: 'api/public', data: {method: method, data: param}});
    } else {
        Emit({event: 'api', data: {method: method, data: param}});
    }
    if (typeof cb == 'function') {

        if (_public) {
            if (!onEmiter.hasOwnProperty('API_Response_public_' + method))
                onEmiter['API_Response_public_' + method] = cb;
        }
        else {
            if (!onEmiter.hasOwnProperty('API_Response_' + method))
                onEmiter['API_Response_' + method] = cb;
        }
        if (reset_cb) {
            if (_public)
                onEmiter['API_Response_public_' + method] = cb;
            else
                onEmiter['API_Response_' + method] = cb;
        }
    }

}