document.getElementById('burger').addEventListener('click', function () {
    const panel = document.getElementById('mobilePanel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        panel.classList.remove('-translate-x-full');
    } else {
        panel.classList.add('-translate-x-full');
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 300);
    }
});

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

