//--Работа с куками на клиенте------------------------------------------------------------------------------------

//--возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//--устанавливает cookie c именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

//--удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {expires: -1});
}
//-----------------------------------------------------------------------------------------------------------------


// console.log("%cОстановитесь эта консоль для разработчиков","font-family:Whitney,Helvetica,Arial,sans-serif;font-size:50px;font-weight:bold;text-transform:uppercase;color:#ffa834;-webkit-text-stroke:2px red;");
var initLang = document.URL.split('/');
var nameLang = initLang[3];
//var loadLang = $.ajax({
//    url: '/lang/' + nameLang + '.json',
//    dataType: 'json',
//    async: false
//});
//var lang = loadLang.responseJSON;

var socket = io.connect();

socket.on('connect', function () {
    console.log('Client has connected to the server!');
    jQuery(function ($) {
        $(document).ready(function () {
            //socket.emit('get_event_list', {lang: nameLang, id: 1});

            var homepage = document.getElementById('main_content');
            if (!!homepage) {
                //socket.emit('get_wallets', {lang: nameLang});
                socket.emit('get_new_events', {lang: nameLang});
                socket.emit('get_current_events', {lang: nameLang});
                socket.emit('get_closed_events', {lang: nameLang});
            }
        });
    });
});

function hasFlash() {
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        return !!navigator.plugins['Shockwave Flash'];
    }
    if (navigator.appVersion.indexOf('MSIE') && !navigator.userAgent.indexOf('Opera')) {
        try {
            return !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch (e) {
        }
    }
    return false;
}

function initModal(size) {
    $('body').css('overflow', 'hidden');
    $('#modal-' + size).modal();
    document.getElementById('modal-header-' + size).innerHTML = '-';
    document.getElementById('modal-body-' + size).innerHTML = '<div style="text-align: center"><i class="fa fa-refresh fa-5x fa-spin"></i></div>';
}

function hideModal(size) {
    $('#modal-' + size).modal('hide');
}

function transport_ulogin(res) {
    auth.ulogin(res);
}

var auth = {
    ulogin: function (token) {
        initModal('small');
        socket.emit('ulogin', {token: token});
    },
    login: function (email, pass) {
        initModal('small');
        socket.emit('sing_login', {email: email, pass: pass});
    },
    registr: function (nickname, email, pass, repass) {
        initModal('small');
        socket.emit('registr', {
            email: email,
            pass: pass,
            pass2: repass,
            nickname: nickname
        });
    }
};

socket.on('authInit', function (data) {
    initModal('small');
    if (data.success == true) {
        document.getElementById('modal-body-small').innerHTML = 'Успешний вход';
        setTimeout(function () {
            hideModal('small');
            location.reload();
        }, 1500);
    } else {
        document.getElementById('modal-body-small').innerHTML = 'Error';
        setTimeout(function () {
            getContent("login")
        }, 1500);
    }
});


function getContent(template) {
    initModal('small');
    socket.emit('getContent', {template: template, lang: nameLang});
}

$('#modal-small').on('hidden.bs.modal', function (e) {
    $('body').css('overflow', 'visible');
});

$('#modal-small').on('show.bs.modal', function (e) {
    $('body').css('overflow', 'hidden');
});

socket.on('setContent', function (data) {
    document.getElementById('modal-body-small').innerHTML = data.html;
});

//--обработчики для верхнего тулбара----------------------------------------------------------------------------
// document.getElementById('main_nav').onclick = function(e) {
//     if(e.target.dataset.action == 'get_account_page'){
//         socket.emit('get_account_page', {lang: nameLang});
//     }
// };
//--------------------------------------------------------------------------------------------------------------

//--обработчики для главного контента страницы -----------------------------------------------------------------
document.getElementById('main_content').onclick = function (e) {

    if (e.target.dataset.action == 'get_create_bet') {
        socket.emit('get_create_bet', {lang: nameLang, id: e.target.parentNode.dataset.id});
    }
    //else if(e.target.dataset.action == 'my_list'){
    //    console.log('my_list, id='+e.target.parentNode.dataset.id);
    //}

};
//--------------------------------------------------------------------------------------------------------------

socket.on('get_create_bet_response', function (data) {
    // initModal('small');
    betInfoBlock.dom_content.innerHTML = data.html;

    var create_bet = document.getElementById('create_bet');
    if (!!create_bet) {
        document.getElementById('create_bet').onsubmit = function () {
            var data = $('#create_bet').serializeObject();
            socket.emit('create_bet', {lang: nameLang, data: data});
            return false;
        };
    }

});

socket.on('get_new_events_response', function (data) {
    if (newEventsBlock)
        newEventsBlock.dom_content.innerHTML = data.html;
    else
        console.error('Error find block newEventsBlock');

});

socket.on('get_current_events_response', function (data) {
    if (nowEventsBlock)
        nowEventsBlock.dom_content.innerHTML = data.html;
    else
        console.error('Error find block nowEventsBlock');
});

socket.on('get_closed_events_response', function (data) {
    if (closedEventsBlock)
        closedEventsBlock.dom_content.innerHTML = data.html;
    else
        console.error('Error find block closedEventsBlock');
});

socket.on('get_wallets_response', function (data) {
    document.getElementById('main_content').innerHTML = data.html;
    if ($('.clipboard').length > 0) {
        if (hasFlash()) {
            var client = new ZeroClipboard($('.clipboard'));
            client.on("ready", function (readyEvent) {
                // alert( "ZeroClipboard SWF is ready!" );

                client.on("aftercopy", function (event) {
                    //alert("Copied text to clipboard: " + event.data["text/plain"] );
                });
            });
        } else {
            $('.clipboard').click(function () {
                window.prompt('', $(this).data('clipboard-text'));
            });
        }
    }
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

socket.on('get_account_page_response', function (data) {
    document.getElementById('main_content').innerHTML = data.html;
    //--обработчики для личного кабинета ----------------------------------------------------------------------------
    var buy_pro_account = document.getElementById('buy_pro_account');
    if (!!buy_pro_account) {
        document.getElementById('buy_pro_account').onclick = function () {
            socket.emit('buy_pro_account', {lang: nameLang});
        };
    }

    var create_events = document.getElementById('create_events');
    if (!!create_events) {
        document.getElementById('create_events').onsubmit = function () {
            var data = $('#create_events').serializeObject();
            socket.emit('create_events', {lang: nameLang, data: data});
            return false;
        };
    }

    var create_ticket = document.getElementById('create_ticket');
    if (!!create_ticket) {
        document.getElementById('create_ticket').onsubmit = function () {
            var data = $('#create_ticket').serializeObject();
            socket.emit('create_ticket', {lang: nameLang, data: data});
            return false;
        };
    }
    //--------------------------------------------------------------------------------------------------------------
});