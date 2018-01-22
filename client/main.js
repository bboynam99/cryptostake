import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router, RouteController }	from 'meteor/iron:router';
import './main.html';

Template.main.onRendered(function () {
    this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');



        $(function ($) {
            $("#tabs").tabs();
        });

        $(function ($) {
            $("#accordion").accordion({
                heightStyle: "content"
            });
        });
    });
});

Template.main.events({
    'click #profile-button': function (event) {
        Router.go('/user/profile');
    }
});