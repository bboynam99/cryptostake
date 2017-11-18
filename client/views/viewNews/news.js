Template.News.onRendered(function () {
    //this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');

        createScroll({
            /*newsBlock: {
                selector: '.news-block',
                options: {axis: 'x'},
                callbacks: {}
            },*/
            betInfoBlock: {
                selector: '.content-bet-info',
                options: {},
                callbacks: {
                    create: function () {

                    }
                }
            }
        });
    //});
})