function swiper() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        simulateTouch: false,
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                simulateTouch: true,
            },
            992: {
                simulateTouch: true,
            }
        }
    });

    $('.prev').on('click', function () {
        setTimeout(function () {
            swiper.slidePrev()
        }, 1700)
    })

    $('.next').on('click', function () {
        setTimeout(function () {
            swiper.slideNext()
        }, 1200)
    })

    $('.arrows').on('click', function () {
        $('.reveal').addClass('active')
        TweenMax.to(".box-title", .8, {
            x: 100,
            opacity: 0,
            ease: "Power2.easeInOut",
            delay: 0,
        })
    })

    swiper.on('slideChangeTransitionEnd', function () {
        $('.reveal').removeClass('active')
        TweenMax.to(".box-title", 1, {
            x: 0,
            opacity: 1,
            ease: "Power2.easeInOut",
            delay: 0,
        })
    })

}

function introFun() {
    var tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.to(".text", { y: "0%", duration: 1.2, stagger: 0.25 });
    tl.to(".color-slider", { y: "-100%", duration: 1.5, delay: 0.5 });
    tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
}

// SWIPER END //

var Scrollbar = window.Scrollbar;

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.5,
    });

    tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.2, delay: 0.3 });
};

$(function () {

    barba.init({
        sync: true,
        transitions: [
            {
                async leave(data) {
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },

                async enter(data) {
                    contentAnimation();
                },

                async once(data) {
                    contentAnimation();
                },
            },
        ],
        views: [{
            namespace: 'home',
            async beforeEnter(data) {
                introFun();
            },
            async afterEnter(data) {
                swiper();
            },
        }, {
            namespace: 'realizacje',
            beforeEnter(data) {

            },
            async afterEnter(data) {
                lightGallery(document.getElementById('gallery'));
                Scrollbar.init(document.querySelector('#gallery-scrollbar'));
            }
        },]
    });

});

// Hamburger Menu -collapse  //
$('body').on('click', '.hamburger', function () {
    $(this).toggleClass('is-active')
})

// Menu view  //
$('body').on('click', '.hamburger', function () {
    var tlmenu = new TimelineMax({
        paused: true,
        delay: -1,
    })

    tlmenu.staggerFromTo(
        ".nav",
        .7,
        { left: '-100%', display: 'none', ease: Circ.easeInOut },
        { left: '0%', display: 'block', ease: Circ.easeInOut },
        0.1
    )

    tlmenu.staggerFromTo(
        ".nav .menu",
        .8,
        { x: -50, opacity: 0, ease: Circ.easeInOut },
        { x: 0, opacity: 1, ease: Circ.easeInOut },
        0.1,
    )

    if ($(this).hasClass('is-active')) {
        tlmenu.play(0)
    } else {
        tlmenu.reverse(-0.5)
    }
})

$('body').on('click', '.nav .menu li a', function () {
    $('.nav').fadeOut(1200)
    $('.hamburger').removeClass('is-active')
})
// Hamburger END //

/*
// Momentum Scrolling - full website //
var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector('#my-scrollbar'));
*/