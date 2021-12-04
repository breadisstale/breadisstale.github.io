"use strict"
window.addEventListener("DOMContentLoaded", () => {

    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        
        testWebP(function (support) {
        
        if (support == true) {
        document.querySelector('body').classList.add('webp');
        }else{
        document.querySelector('body').classList.add('no-webp');
        }
        });

    // Fixed menu
    const fixedHeader = document.querySelector('.header');
    const header = document.querySelector('header');

    window.onscroll = () => {
        const Y = window.scrollY

        if (Y > header.offsetHeight) {
            fixedHeader.classList.add('fixed');
        } else {
            fixedHeader.classList.remove('fixed');
        }
    }

    // Sidenav menu
    const sidenavIcon = document.querySelector('.sidenav-icon');
    const closeSidenav = document.querySelector('.sidenav .closebtn');
    const sideNavBody = document.getElementById('mySidenav');

    sidenavIcon.addEventListener('click', function () {
        sideNavBody.style.width = "250px";
        sidenavIcon.classList.add('box-shadow');
        document.body.style.overflowY = 'hidden';
    });

    closeSidenav.addEventListener('click', function () {
        sideNavBody.style.width = "0";
        sidenavIcon.classList.remove('box-shadow');
        document.body.style.overflowY = 'auto';
    });

    sideNavBody.addEventListener('click', function (e) {
        let target = e.target;

        if (target.classList.contains('closeMenu')) {
            sideNavBody.style.width = "0";
            sidenavIcon.classList.remove('box-shadow');
            document.body.style.overflowY = 'auto';
        };
    });

    // Scroll on click
    const menuLinks = document.querySelectorAll('[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {

                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }

    // Slider (testimonials)
    new Swiper('.testimonials_swiper', {
        navigation: {
            prevEl: ".testimonials_slider-prev",
            nextEl: ".testimonials_slider-next"
        },
        pagination: {
            el: ".swipper-pagination",
            clickable: true
        },
        simulateTouch: false,
        slideToClickedSlide: true,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        slidesPerView: 3,

        spaceBetween: 60,

        slidesPerGroup: 1,

        loop: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
            },

            680: {
                slidesPerView: 2,
            },
            1110: {
                slidesPerView: 3,
            }
        },
    });

    // Change min-height of slides
    function heightOfSlide() {
        const sliderCards = document.querySelectorAll('.testimonials_card');

        let maxHeight = 0;
        for (let i = 0; i < sliderCards.length; i++) {
            if (sliderCards[i]) {
                let currentHeight = sliderCards[i].offsetHeight;
                if (currentHeight >= maxHeight) {
                    maxHeight = currentHeight;
                };
            } else {
                break;
            }
        };
        for (let i = 0; i < sliderCards.length; i++) {
            sliderCards[i].style.minHeight = maxHeight + 'px';
        }
    };

    heightOfSlide();
    window.addEventListener('resize', heightOfSlide);

    // Modals
    const modalButtons = document.querySelectorAll('[data-modal-button]');
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
    const allModals = document.querySelectorAll('[data-modal]');

    modalButtons.forEach(function (item) {
        item.addEventListener('click', function () {
            const modalId = this.dataset.modalButton;
            const modal = document.querySelector('#' + modalId);

            modal.classList.remove('hidden');

            modal.querySelector('.modal-window').addEventListener('click', function (e) {
                e.stopPropagation();
            })

            document.body.style.overflowY = 'hidden';
        })
    })

    modalCloseButtons.forEach(function (item) {
        item.addEventListener('click', function () {
            const modal = this.closest('[data-modal]');
            modal.classList.add('hidden');

            document.body.style.overflowY = 'auto';
        })
    })

    allModals.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.add('hidden');

            document.body.style.overflowY = 'auto';
        })
    })
});

