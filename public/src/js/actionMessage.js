var background_window = 'url(/src/img/paper.png) 100% 100% no-repeat';
function errorMessage(mess) {
    swal({
        title: _e("Ошибка сообщения!"),
        html: mess + "<br>" + '<span class="font-kalig font-x30">' + _e("Обратитесь в службу поддержки!") + '</span>',
        customClass: 'font-money modal-message-custom-s',
        background: background_window,
        confirmButtonColor: "#2E2E2F",
        type: "error",
        showCancelButton: false,
        confirmButtonText: _e("Ок")
    });
}
var errLoadMessage = setTimeout(function () {

}, 0);
function loadMessage(mess, errmess, errTime) {
    clearTimeout(errLoadMessage);
    if (!mess) mess = '';
    if (!errTime) errTime = 5000;
    swal({
        html: '<i class="fa fa-spinner fa-pulse fa-5x fa-fw" style="color: #3e3e3e"></i><br><br><h3 class="font-money">' + _e('Загрузка...') + '</h3><br><span class="font-money">' + mess + '</span>',
        background: background_window,
        customClass: 'font-money modal-message-custom-s',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false
    });

    errLoadMessage = setTimeout(function () {
        swal({
            title: _e("Ошибка!"),
            html: errmess + "<br>" + '<span class="font-kalig font-x30">' + _e("Обратитесь в службу поддержки!") + '</span>',
            background: background_window,
            customClass: 'font-money modal-message-custom-s',
            confirmButtonColor: "#2E2E2F",
            type: "error",
            showCancelButton: false,
            confirmButtonText: _e("Ok")
        });
    }, errTime)

}
function loadMessage_close() {
    clearTimeout(errLoadMessage);
    swal.close()
}
function actionMessage(id, param, cb, option) {
    clearTimeout(errLoadMessage);
    var optsw = {};
    switch (id) {
        case 'test':
            alert('test');
            break;
        case 'successBuyPro':
            if (!param.days) {
                errorMessage(_e('Ненайден параметр') + ' successBuyPro.days');
                return false;
            }
            if (!param.date) {
                errorMessage(_e('Ненайден параметр') + ' successBuyPro.date');
                return false;
            }
            optsw = {
                title: _e("Успешно!"),
                text: _e("Вы активировали PRO на " + param.days + " дней \n PRO активно по " + param.date),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "success",
                confirmButtonColor: "#2E2E2F",
                showCancelButton: false,
                confirmButtonText: _e("Ok")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function () {
                cb && cb(true);
            });
            break;
        case 'errorBuyProMoney':
            if (!param.amount) {
                errorMessage(_e('Ненайден параметр') + ' errorBuyProMoney.amount');
                return false;
            }
            if (!param.valut) {
                errorMessage(_e('Ненайден параметр') + ' errorBuyProMoney.valut');
                return false;
            }

            optsw = {
                title: _e("Недостаточно средств!"),
                text: _e("Пожалусто  пополните счет.") + '\n' + _e("Необходимо:") + ' ' + param.amount + ' ' + param.valut,
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "error",
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                showCancelButton: true,
                confirmButtonText: _e("Пополнить"),
                cancelButtonText: _e("Отменить")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            });
            break;
        case 'placeBet':
            if (!param.price) {
                errorMessage(_e('Ненайден параметр') + ' placeBet.price');
                return false;
            }
            if (!param.valut) {
                errorMessage(_e('Ненайден параметр') + ' placeBet.valut');
                return false;
            }
            optsw = {
                title: _e("Зарегистрировать ставку?"),
                html: 'Вы делаете ставку на событие: <br>'+param.text+'<hr>'+_e("Ставка:") +param.action+ " "+_e("сумма ") +" <b>" + param.price + " " + param.valut + "</b> ?",
                customClass: 'font-money modal-message-custom-s',
                showCancelButton: true,
                background: background_window,

                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                confirmButtonText: _e("Подтвердить"),
                cancelButtonText: _e("Отменить")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            });
            break;
        case 'successBet':
            if (!param.id) {
                errorMessage(_e('Ненайден параметр') + ' successBet.id');
                return false;
            }

            optsw = {
                title: _e("Успешно!"),
                text: _e("Вы успешно  поставили ставку на собитие ID:" + param.id),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "success",
                confirmButtonColor: "#2E2E2F",
                showCancelButton: false,
                confirmButtonText: _e("Ok")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function () {
                cb && cb(true);
            });
            break;
        case 'errorBetTime':
            optsw = {
                title: _e("Ошибка!"),
                text: _e("Ваша  ставка не принята.") + '\n' + _e("Данное событие уже закрыто для ставок."),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "error",
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                showCancelButton: false,
                confirmButtonText: _e("Ок")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function () {
                cb && cb(true);
            });
            break;
        case 'openNewBet':

            if (!param.type) {
                errorMessage(_e('Ненайден параметр') + ' openNewBet.type');
                return false;
            }
            if (!param.date) {
                errorMessage(_e('Ненайден параметр') + ' openNewBet.date');
                return false;
            }
            if (!param.datebet) {
                errorMessage(_e('Ненайден параметр') + ' openNewBet.datebet');
                return false;
            }
            optsw = {
                title: _e("Подтверждение!"),
                html: _e("Вы действительно хотите создать событие ?") + "<br><hr>" +
                "Приём ставок до: <b>" + param.datebet + "</b><br>" +
                "Завершенние собития: <b>" + param.date + "</b><br>" +
                "Тип: <b> " + param.type + "</b>",
                customClass: 'font-money modal-message-custom-s',
                showCancelButton: true,
                background: background_window,
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                confirmButtonText: _e("Подтвердить"),
                cancelButtonText: _e("Отменить"),

            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            });
            break;
        case 'successOpenNewBet':
            optsw = {
                title: _e("Успешно!"),
                text: _e("Событие принято! \n Будет доступно на  сайте в теченни 30 минут."),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "success",
                confirmButtonColor: "#2E2E2F",
                showCancelButton: false,
                confirmButtonText: _e("Ok")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function () {
                cb && cb(true);
            });
            break;
        case 'errorOpenNewBet':

            optsw = {
                title: _e("У вас недостаточно прав!"),
                text: _e("Для созданния события нужно активировать PRO аккаунт."),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "error",
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                showCancelButton: true,
                confirmButtonText: _e("Купить PRO"),
                cancelButtonText: _e("Отменить")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            });
            break;
        case 'errorAuth':

            optsw = {
                title: _e("У вас недостаточно прав!"),
                text: _e("Для данного действия  требуется авторизация!"),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                html:'',
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                showCancelButton: true,
                confirmButtonText: _e("Войти"),
                cancelButtonText: _e("Зарегестрироватся")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function () {
                cb && cb(true)
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    cb && cb(false)
                }
            });
            break;
        case 'askBuyPro':
            if (!param.price) {
                errorMessage(_e('Ненайден параметр') + ' askBuyPro.price');
                return false;
            }
            if (!param.valut) {
                errorMessage(_e('Ненайден параметр') + ' askBuyPro.valut');
                return false;
            }
            optsw = {
                title: _e("Подтверждение!"),
                html: _e("Вы действительно хотите активировать <br>PRO за <b>") + param.price + " " + param.valut + "</b> ?",
                customClass: 'font-money modal-message-custom-s',
                showCancelButton: true,
                background: background_window,
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                confirmButtonText: _e("Подтвердить"),
                cancelButtonText: _e("Отменить")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            });
            break;
        case 'logout':
            optsw = {
                title: _e("Подтверждение!"),
                html: _e("Вы действительно хотите выйти из аккаунта?"),
                customClass: 'font-money modal-message-custom-s',
                showCancelButton: true,
                background: background_window,
                confirmButtonColor: "#2E2E2F",
                cancelButtonColor: "#FFFFFF",
                cancelButtonClass: 'cancelButton-swal',
                confirmButtonText: _e("Подтвердить"),
                cancelButtonText: _e("Отменить")
            };
            if (option) {
                for (var key in option)
                    if (option.hasOwnProperty(key))
                        optsw[key] = option[key];
            }
            swal(optsw).then(function (isConfirm) {
                if (isConfirm) {
                    cb && cb(true)
                } else {
                    cb && cb(false)
                }
            },function () {
                cb && cb(false);
            });
            break;
        default:
            swal({
                title: _e("Ошибка!"),
                text: _e("Неизвесное сообщенние  actionMessage ID:") + id + "\n" + _e("Обратитесь в службу поддержки!"),
                background: background_window,
                customClass: 'font-money modal-message-custom-s',
                type: "error",
                showCancelButton: false,
                confirmButtonText: _e("Ok")
            }).then(function () {
                cb && cb(true);
            });
            break;
    }
}

// actionMessage('placeBet', {price: '0.30', valut: 'BTC'}, function (status) {
//     if (status) {
//         // client click apply action
//         loadMessage(_e('Регистрация ставки...'), _e('Ошибка  регистрации ставки.') + '<br><span class="font-victor font-x13">' + _e('Code Error:(timeout_response_002)') + '</span>');
//         setTimeout(function () {
//             actionMessage('successBet', {id: '123'});
//         }, 2000);
//         setTimeout(function () {
//             actionMessage('errorBetTime', {})
//         }, 4000);
//         setTimeout(function () {
//             actionMessage('errorBuyProMoney', {amount: '0.30', valut: 'BTC'}, function (status) {
//                 if (status)
//                     console.log('Окно пополненние  баланса');
//             });
//         }, 7000);
//     }
// });

// actionMessage('askBuyPro', {price: '0.1', valut: 'BTC'}, function (status) {
//     if (status) {
//         // client click apply action
//         loadMessage(_e('Производится покупка PRO!'), _e('Купить PRO неудалось.') + '<br><span class="font-victor font-x13">' + _e('Code Error:(timeout_response_001)') + '</span>');
//         setTimeout(function () {
//             actionMessage('successBuyPro', {days: '30', date: '23.06.2016'});
//         }, 2000);
//         setTimeout(function () {
//             actionMessage('errorBuyProMoney', {amount: '0.1', valut: 'BTC'}, function (status) {
//                 if (status)
//                     console.log('Окно пополненние  баланса');
//             });
//         },5000);
//     }
// });
// actionMessage('openNewBet', {datebet: '23.06.16 в 20:00', date: '23.06.16 в 22:00', type: 'Вангуй'}, function (status) {
//     if (status) {
// client click apply action
// loadMessage(_e('Отправка события'), _e('Ошибка событие не созданно.') + '<br><span class="font-victor font-x13">' + _e('Code Error:(timeout_response_003)') + '</span>');
// setTimeout(function () {
//     actionMessage('successOpenNewBet', {});
// }, 2000);
// setTimeout(function () {
//     actionMessage('errorOpenNewBet', {amount: '0.1', valut: 'BTC'}, function (status) {
//         if (status)
//             console.log('Окно покупки PRO');
//     });
// },5000);
// }
// });

//isAuth();