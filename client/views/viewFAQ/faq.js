Template.FAQ.onRendered(function () {
    this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');

        createScroll({
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
})