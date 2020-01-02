var scroll_button = document.getElementById("scroll-button");

scroll_button.addEventListener('click', function () {
    setTimeout(function () {
        window.scrollTo({
            top: 900,
            left: 0,
            behavior: 'smooth'
        });
    }, 200)
});

//$('#scroll-button').click(function () {
//    $('body').animate({scrollTop: 100}, 200);
//    console.log('clicked');
//});

$(document).ready(function () {
    $("#nav-icon").click(function () {
        $("#menu").toggle(600, function () {
            if ($("#menu").is(":visible")) {
//                $("html, body").animate({
//                    scrollTop: "0"
//                });
                document.body.style.overflow = "hidden";

            } else {
                document.body.style.overflow = "scroll";

            }
        });
    });
});

var menu = document.getElementById("menu");

if (menu.style.display == "block") {
    document.body.style.overflow = "hidden";
    console.log('open');
} else {
    document.body.style.overflow = "scroll";
    console.log('closed');

}
