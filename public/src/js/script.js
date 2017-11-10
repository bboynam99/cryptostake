$(document).ready(function () {
    createScroll({
        newEventsBlock: {
            selector: '.new-event-block',
            options: {},
            callbacks: {
                create: function () {

                    requireElement({name: "Eventnew", ver: "1.0.0", el_selector: "#" + newEventsBlock.dom_content.id});

                },
                init: function () {

                }
            }
        },
        nowEventsBlock: {
            selector: '.now-event-block',
            options: {},
            callbacks: {
                create: function () {

                    requireElement({
                        name: "Eventcurrent",
                        ver: "1.0.0",
                        el_selector: "#" + nowEventsBlock.dom_content.id
                    });

                },
                init: function () {

                }
            }
        },
        chatBlock: {
            selector: '.chat-block',
            options: {},
            callbacks: {
                create: function () {
                    requireElement({name: "Chat", ver: "1.0.0", el_selector: "#" + chatBlock.dom_content.id});

                },
                init: function () {

                }
            }
        },
        closedEventsBlock: {
            selector: '.closed-event-block',
            options: {},
            callbacks: {
                create: function () {

                    requireElement({
                        name: "Eventclosed",
                        ver: "1.0.0",
                        el_selector: "#" + closedEventsBlock.dom_content.id
                    });

                },
                init: function () {

                }
            }
        },
        newsBlock: {
            selector: '.news-block',
            options: {axis: 'x'},
            callbacks: {}
        },
        betInfoBlock: {
            selector: '.content-bet-info',
            options: {},
            callbacks: {
                create: function () {

                }
            }
        }
    });

});

var clock = $('.clock-data').FlipClock({
    clockFace: 'TwentyFourHourClock'
});
var user = false;
function isAuth() {
    if (!user)
        actionMessage('errorAuth', {}, function (status) {
            if (status)
                loadMessage('Загрузка страници авторизации!', 'Ошибка!!!!', 60000);
            else
                loadMessage('Загрузка страници регистрации!', 'Ошибка!!!!', 60000);
        });
}
var CryptoModel = {
    eventEmitter: {},
    on: function (event, fn) {
        // this.on('*', function (e, v1, v2, v3) {
        //     if (window.CryptoModel && e && e.name) CryptoModel.emit(e.name)(v1, v2, v3);
        // });
        CryptoModel.eventEmitter[event] = fn;
    },
    emit: function (event, param, param2, param3) {
        if (CryptoModel.eventEmitter.hasOwnProperty(event)) {
            CryptoModel.eventEmitter[event](param, param2, param3)
        }
    },
    page: false,
    setPage(page, tab, historyAdd){
        if (!tab) tab = '';
        if (ractiveComponent && CryptoModel.page && ractiveComponent[CryptoModel.page] && ractiveComponent[CryptoModel.page].fragment.rendered) {
            ractiveComponent[CryptoModel.page].unrender();
        }


        if ('news' == page) {
            requireElement({name: 'News', ver: '1.1.0', element: "#" + betInfoBlock.dom_content.id}, {
                cnt: 0,
                afterlast: function (name) {


                    CryptoModel.page = name;
                    if (ractiveComponent && CryptoModel.page && ractiveComponent[CryptoModel.page] && !ractiveComponent[CryptoModel.page].fragment.rendered) {
                        ractiveComponent[name].render();
                        if (tab || tab != '')
                            ractiveComponent[name].set('tab', tab);
                    }
                }
            });
        }

        if ('faq' == page) {
            requireElement({name: 'Faq', ver: '1.1.0', element: "#" + betInfoBlock.dom_content.id}, {
                cnt: 0,
                afterlast: function (name) {


                    CryptoModel.page = name;
                    if (ractiveComponent && CryptoModel.page && ractiveComponent[CryptoModel.page] && !ractiveComponent[CryptoModel.page].fragment.rendered) {
                        ractiveComponent[name].render();
                        if (tab || tab != '')
                            ractiveComponent[name].set('tab', tab);
                    }
                }
            });
        }
        if ('Event' == page) {
            requireElement({name: 'Event', ver: '1.1.0', element: "#" + betInfoBlock.dom_content.id}, {
                cnt: 0,
                afterlast: function (name) {
                    console.log(name);
                    CryptoModel.page = page;

                    if (ractiveComponent && CryptoModel.page && ractiveComponent[CryptoModel.page] && !ractiveComponent[CryptoModel.page].fragment.rendered) {
                        ractiveComponent[CryptoModel.page].render();
                        if (tab && tab != '')
                            ractiveComponent[CryptoModel.page].set('tab', tab);
                    }
                }
            });
        }

        if ('contact' == page) {
            requireElement({name: 'Contact', ver: '1.1.0', element: "#" + betInfoBlock.dom_content.id}, {
                cnt: 0,
                afterlast: function (name) {

                    if (ractiveComponent && CryptoModel.page && ractiveComponent[CryptoModel.page] && !ractiveComponent[CryptoModel.page].fragment.rendered) {
                        ractiveComponent[CryptoModel.page].render();
                        if (tab || tab != '')
                            ractiveComponent[CryptoModel.page].set('tab', tab);
                    }
                }
            });
        }
        if (!historyAdd)
            history.pushState({}, "Crypto Stake", "#" + page + '-' + tab);

    },
    event: {
        data: {},
        update: function () {
            async.series({
                open: function (callback) {
                    API('select_events', {status_id: 1}, true, function (res) {
                        if (res.success != true)
                            return callback(res.error, null);
                        callback(null, res.item);
                    }, true);
                },
                current: function (callback) {
                    API('select_events', {status_id: 2}, true, function (res) {
                        if (res.success != true)
                            return callback(res.error, null);
                        callback(null, res.item);
                    }, true);
                },
                closed: function (callback) {
                    API('select_events', {status_id: 3}, true, function (res) {
                        if (res.success != true)
                            return callback(res.error, null);
                        callback(null, res.item);
                    }, true);
                }
            }, function (err, results) {
                if (err)
                    swal('Error', 'Error API [select_events]', 'error');

                CryptoModel.event.data = results;
                for (var k in  CryptoModel.event.cb_function_arr) {
                    CryptoModel.event.cb_function_arr[k](CryptoModel.event.data);
                }
            });

        },
        cb_function_arr: [],
        callback_save: function (fn) {
            CryptoModel.event.cb_function_arr.push(fn);
            if (CryptoModel.event.cb_function_arr.length == 1 && Object.keys(CryptoModel.event.data).length == 0) {
                CryptoModel.event.update();
            } else
                fn(CryptoModel.event.data);

        }
    }
};
var openEventById = null;
CryptoModel.on('openEventById', function (id) {
    console.log('openEventById', id);

    CryptoModel.setPage('event', id);
    loadMessage(_e('Загрузка данных на собитие'), _e('Ошибка загрузки собития'), 8000)
});

CryptoModel.on('logout', function (id) {
    ractiveComponent['Auth'].set('load', false);

    actionMessage('logout', {}, function (status) {
        ractiveComponent['Auth'].set('load', true);
        if (status) {
            ractiveComponent['Auth'].set('auth', {});
        }

    })


});
function transport_ulogin(data) {
    console.log('transport_ulogin', data);
    API('ulogin_auth', {token: data}, true, function (res) {
        if (res || res.error || res.success == false)
            swal('Ошибка', 'Ошибка авторизации через соц сеть', 'error');
        else
            swal('Успешно', 'Вы вошли в аккаунт', 'success');

    });


}
function login(username, password) {
    console.log('user_auth', username, password);
    API('user_auth', {username: username, password: password}, true, function (res) {
        if (res || res.error || res.success == false)
            swal('Ошибка', 'Ошибка авторизации через соц сеть', 'error');
        else
            swal('Успешно', 'Вы вошли в аккаунт', 'success');

    });
}

