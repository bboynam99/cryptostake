import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router, RouteController }	from 'meteor/iron:router';
import './main.html';

Template.main.onRendered(function () {
    this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');

        (function ($) {
            $("#tabs").tabs();
        });

        (function ($) {
            $('.datepicker').datepicker();
        });

        (function ($) {
            $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: 'Назад',
                nextText: 'Далее',
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['ru']);
        });

        (function ($) {
            $("#accordion").accordion({
                heightStyle: "content"
            });
        });

        $('#basic_example_2').timepicker({
            timeOnlyTitle: 'Выберите время',
            timeText: 'Время',
            hourText: 'Часы',
            minuteText: 'Минуты',
            secondText: 'Секунды',
            currentText: 'Сейчас',
            closeText: 'Закрыть'
        });

        $('#basic_example_3').timepicker({
            timeOnlyTitle: 'Выберите время',
            timeText: 'Время',
            hourText: 'Часы',
            minuteText: 'Минуты',
            secondText: 'Секунды',
            currentText: 'Сейчас',
            closeText: 'Закрыть'
        });

    });
})