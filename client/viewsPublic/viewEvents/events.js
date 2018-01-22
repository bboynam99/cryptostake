Template.eventsBlock.onRendered(function () {
    $('.eventblock').addClass('show-blk');
    $('.content-bet-info').addClass('show-blk');

    $(document).ready(function () {
        $('.eventblock').mCustomScrollbar({
            axis: "y" //vertical scroll
        });
    });
})