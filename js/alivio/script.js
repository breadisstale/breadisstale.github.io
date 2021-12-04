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

    // Sidenav menu
    const sidenavIcon = document.querySelector('.sidenav-icon');
    const closeSidenav = document.querySelector('.sidenav .closebtn');
    const sideNavBody = document.getElementById("mySidenav");

    sidenavIcon.addEventListener('click', function () {
        sideNavBody.style.width = '250px';
        sidenavIcon.classList.add('box-shadow');
        document.body.style.overflowY = 'hidden';
    });

    closeSidenav.addEventListener('click', function () {
        sideNavBody.style.width = '0';
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

    // Scroll to top
    const headerHeight = document.querySelector('.header');
    let offset = headerHeight.offsetHeight;

    const scrollUp = document.querySelector('.scroll-up');
    const scrollUpSvgPath = document.querySelector('.scroll-up_svg-path');

    const pathLenght = scrollUpSvgPath.getTotalLength();

    scrollUpSvgPath.style.strokeDasharray = `${pathLenght} ${pathLenght}`;
    scrollUpSvgPath.style.transition = `stroke-dashoffset 20ms`;

    const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

    const updateDashoffset = () => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const dashoffset = pathLenght - (getTop() * pathLenght / height);
        scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    };

    window.addEventListener('scroll', function () {
        updateDashoffset();

        if (getTop() > offset) {
            scrollUp.classList.add('scroll-up--active');
        } else {
            scrollUp.classList.remove('scroll-up--active');
        }
    });

    scrollUp.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

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
