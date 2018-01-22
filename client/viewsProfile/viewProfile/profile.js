Template.Profile.onRendered(function () {
    this.autorun(function () {
        $('.eventblock').addClass('show-blk');
        $('.content-bet-info').addClass('show-blk');

        // placeholder-focus
        $(document).ready(function () {
            $('input,textarea').focus(function(){
                $(this).data('placeholder',$(this).attr('placeholder'))
                $(this).attr('placeholder','');
            });
            $('input,textarea').blur(function(){
                $(this).attr('placeholder',$(this).data('placeholder'));
            });
        });

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


    })
});