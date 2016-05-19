"use strict";
$(window).on("load resize", function() {
    parseInt($('[data-tabela="dias-mes"]').css("width"));
    $('[data-tabela="dias-mes"] , [data-tabela="reserva"]').css("position", "absolute"), $('[data-tabela="dias"]').css({
        width: "100%",
        overflow: "hidden"
    });
    var a = parseInt($('[data-tabela="dias-mes"]').css("width"));
    $('[data-tabela="dias-mes"]').each(function(t, e) {
        var s = t * a;
        $(e).css({
            left: s,
            "z-index": t++
        })
    }), $('[data-tabela="reserva"]').each(function(t, e) {
        var s = t * a;
        $(e).css({
            left: s,
            "z-index": t++
        })
    }), $('[data-list="horario"]').scroll(function() {
        $('[data-list="vagas"]').scrollTop($('[data-list="horario"]').scrollTop())
    });
    var t = parseInt($('[data-tabela="reserva"]:nth-child( 4 )').css("left")),
        e = parseInt($('[data-tabela="reserva"]:last').css("left")),
        s = parseInt($('[data-tabela="reserva"]:first').css("width"));
    $('[data-scroll="next"]').on("click", function() {
        var e = parseInt($('[data-tabela="reserva"]:first').css("left"));
        event.stopImmediatePropagation();
        var r = parseInt($('[data-tabela="reserva"]:last').css("left"));
        r > t && ($('[data-tabela="reserva"] ').each(function(t, e) {
            var s = parseInt($(e).css("left")) - a;
            $(e).animate({
                left: s
            }, "slow")
        }), $('[data-tabela="dias-mes"] ').each(function(t, e) {
            var s = parseInt($(e).css("left")) - a;
            $(e).animate({
                left: s
            }, "slow")
        })), -e - s == 0 ? $(this).css({
            opacity: .6,
            cursor: "default"
        }) : $('[data-scroll="prev"]').css({
            opacity: 1,
            cursor: "pointer"
        })
    }), $('[data-scroll="prev"]').on("click", function() {
        var t = parseInt($('[data-tabela="reserva"]:first').css("left"));
        event.stopImmediatePropagation();
        var r = parseInt($('[data-tabela="reserva"]:last').css("left"));
        e > r && ($('[data-tabela="reserva"] ').each(function(t, e) {
            var s = parseInt($(e).css("left")) + a;
            $(e).animate({
                left: s
            }, "slow")
        }), $('[data-tabela="dias-mes"] ').each(function(t, e) {
            var s = parseInt($(e).css("left")) + a;
            $(e).animate({
                left: s
            }, "slow")
        })), -t - s == 0 ? $(this).css({
            opacity: .6,
            cursor: "default"
        }) : $('[data-scroll="next"]').css({
            opacity: 1,
            cursor: "pointer"
        })
    }), window.innerWidth < 750 ? $('[data-reserva="reserva-horario"]').each(function(a, t) {
        $(t).find('[data-reserva="celula-vaga"]').each(function(a, t) {
            $(t).html($('[data-reserva="celula-horario"]:nth-child(' + (a + 1) + ")").html())
        })
    }) : $('[data-reserva="reserva-horario"]').each(function(a, t) {
        $(t).find('[data-reserva="celula-vaga"]').each(function(a, t) {
            $(t).html("&nbsp;")
        })
    })
});