$(document).ready(function () {
    function shakeTooltip() {
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function (index) {
            setTimeout(() => {
                if (document.querySelector('.btn-menu-close').style.display !== "none") {
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility', 'visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility', '');
                        $(this).removeClass('shake');
                    }, 3000);
                } else {
                    return false;
                }
            }, index * 5000);
        });
    }

    if ($('#menu-access').length > 0) {
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function () {
        $('tooltiptext').css('visibility', '');
        clearInterval(myInterval);
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('[data-bs-toggle="popover"]').popover();
});
