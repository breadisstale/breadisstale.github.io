"use strict"
window.addEventListener("DOMContentLoaded", () => {

   // Menu overlay
   const openMenuBtn = document.querySelector('.openMenu');
   const closeBtn = document.querySelector('.closebtn');
   const menuWindow = document.getElementById("myNav");

   openMenuBtn.addEventListener('click', function () {
      menuWindow.style.width = "100%";
      document.body.style.overflowY = "hidden";
   });

   closeBtn.addEventListener('click', function () {
      menuWindow.style.width = "0%";
      document.body.style.overflowY = "auto";
   });

   menuWindow.addEventListener('click', function (e) {
      let target = e.target;

      if (target.classList.contains('closeMenu')) {
         menuWindow.style.width = "0%";
         document.body.style.overflowY = "auto";
      };
   });

   //Scroll to top
   const headerHeight = document.querySelector('header');
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

   // Scroll to block
   const menuLinks = document.querySelectorAll('[data-goto]');

   if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
         menuLink.addEventListener('click', onMenuLinkClick);
      });

      function onMenuLinkClick(e) {
         const menuLink = e.target;

         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {

            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 30;

            window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth"
            });

            e.preventDefault();
         };
      };
   };

   // Tabs for block "works"
   const tabHeaders = document.querySelectorAll('[data-tab]');
   const contentBoxes = document.querySelectorAll('[data-tab-content]');
   const tabsButton = document.querySelectorAll('.works-tab');

   tabHeaders.forEach(function (item) {
      item.addEventListener('click', function () {

         contentBoxes.forEach(function (item) {
            item.classList.add('hidden');
         });

         const contentBox = document.querySelector('#' + this.dataset.tab);
         contentBox.classList.remove('hidden');
      });
   });

   tabsButton.forEach(function (item) {
      item.addEventListener('click', function (e) {
         let target = e.target;

         tabsButton.forEach(function (item) {
            item.classList.remove('_active-tab');
         });

         target.classList.add('_active-tab');

      });
   });

   // Slider (Posts)
   new Swiper('.posts_swiper', {
      navigation: {
         prevEl: ".posts_slider-prev",
         nextEl: ".posts_slider-next"
      },
      simulateTouch: false,
      slideToClickedSlide: true,

      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },

      autoHeight: true,
      slidesPerView: 3,

      spaceBetween: 60,

      slidesPerGroup: 1,

      loop: true,

      breakpoints: {
         0: {
            slidesPerView: 1,
         },

         560: {
            slidesPerView: 2,
         },
         930: {
            slidesPerView: 3,
         }
      },
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
      });
   });

   modalCloseButtons.forEach(function (item) {
      item.addEventListener('click', function () {
         const modal = this.closest('[data-modal]');
         modal.classList.add('hidden');

         document.body.style.overflowY = 'auto';
      });
   });

   allModals.forEach(function (item) {
      item.addEventListener('click', function () {
         this.classList.add('hidden');

         document.body.style.overflowY = 'auto';
      });
   });
});






