Template.Contacts.onRendered(function () {
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
    });
})