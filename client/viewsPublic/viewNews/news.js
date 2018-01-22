Template.News.onCreated(function(){
    this.subscribe('newsPage');
});

Template.News.onRendered(function () {
    //this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');

        $(document).ready(function () {
            $('.eventblock').createScroll({
                betInfoBlock: {
                    selector: '.content-bet-info',
                    options: {},
                    callbacks: {create: function () {

                        }
                    }
                }
            })
        })

        /*createScroll({
            betInfoBlock: {
                selector: '.content-bet-info',
                options: {},
                callbacks: {create: function () {

                    }
                }
            }
        });*/
    //});
})

Template.News.helpers({
    news: function(){
        return News.find().fetch();
    }
});
