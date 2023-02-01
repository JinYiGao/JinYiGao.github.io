$(window).scroll(function() {
    $(window).scrollTop() > 500 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
});
$("#rocket").click(function() {
    $("#rocket").addClass("launch");
    $("html, body").animate({
        scrollTop: 0
    }, 500, function() {
        $("#rocket").removeClass("show launch");
    });
    return false;
});

var hidden = true;
$("#post-donation-qrcodes").hide();
$("#post-donation-button").click(function() {
    return function (){
        hidden ? $("#post-donation-qrcodes").show() : $("#post-donation-qrcodes").hide();
        hidden = !hidden;
    }()
});
