import { _ }             from 'meteor/underscore';
import { $ }             from 'meteor/jquery';
import { Meteor }        from 'meteor/meteor';
import { Template }      from 'meteor/templating';
import { ReactiveVar }   from 'meteor/reactive-var';

const Collections = {};
const _app = { NOOP(){} };

if (Meteor.isClient) {
  window.IS_RENDERED = false;
  if (!window.requestAnimFrame) {
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();
  }

  let _el = null;

  _app.uploads  = new ReactiveVar(false);
  _app.storeTTL = 86400000;
  _app.currentUrl = () => {
    return Meteor.absoluteUrl((FlowRouter.current().path || document.location.pathname).replace(/^\//g, '')).split('?')[0].split('#')[0].replace('!', '');
  };
  _app.storeTTLUser = 432000000;
  _app.showProjectInfo = new ReactiveVar(false);
  _app.serviceConfiguration = new ReactiveVar({});

  Template.registerHelper('urlCurrent', () => {
    return _app.currentUrl();
  });

  Template.registerHelper('url', (string = null) => {
    return Meteor.absoluteUrl(string);
  });

  Template.registerHelper('filesize', (size = 0) => {
    return filesize(size);
  });

  Template.registerHelper('extless', (filename = '') => {
    const parts = filename.split('.');
    if (parts.length > 1) {
      parts.pop();
    }
    return parts.join('.');
  });

  Template.registerHelper('DateToISO', (time = 0) => {
    if (_.isString(time) || _.isNumber(time)) {
      time = new Date(time);
    }
    return time.toISOString();
  });
}

export { _app, Collections };
