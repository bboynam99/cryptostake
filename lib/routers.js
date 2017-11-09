Router.configure({
    layoutTemplate: 'main',
    // loadingTemplate: 'loading',
    // notFoundTemplate: 'notfound',
    //yieldTemplates: {
    //	nav: {to: 'nav'},
    //	footer: {to: 'footer'},
    //}
});

Router.route('/', {
    action: function() {
        this.render('Index');
    }
});

Router.route('/news', {
    action: function () {
        this.render('News');
    }
});