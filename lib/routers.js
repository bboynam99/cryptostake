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

Router.route('/stats', {
    action: function () {
        this.render('Stats');
    }
});

Router.route('/faq', {
    action: function () {
        this.render('FAQ');
    }
});


Router.route('/contacts', {
    action: function () {
        this.render('Contacts');
    }
});

Router.route('/user/profile', {
    action: function () {
        this.render('Profile');
    }
});

Router.route('/user/messenger', {
    action: function () {
        this.render('Messenger');
    }
});