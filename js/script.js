var prevScrollpos = window.pageYOffset;
var navbar = document.getElementById("navbar");

window.onscroll = function() {

    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
};