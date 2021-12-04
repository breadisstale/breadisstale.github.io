"use strict"

// var isIE = /*@cc_on!@*/false || !!document.documentMode;
// if (isIE) {

// };

window.addEventListener("DOMContentLoaded", () => {

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

   // Select
   function select() {
      const selectHeader = document.querySelectorAll('.select__header');
      const selectHeaderButton = document.querySelector('.select__header-icon-body');

      selectHeader.forEach(item => {
         item.addEventListener('click', selectToggle);
      });

      selectHeaderButton.addEventListener('click', selectToggle);

      function selectToggle() {
         this.parentElement.classList.toggle('is-active');
      };
   };

   select();

   // Slider
   new Swiper('.portfolio__swiper', {
      navigation: {
         prevEl: ".portfolio__slider-prev",
         nextEl: ".portfolio__slider-next"
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

      spaceBetween: 40,

      slidesPerGroup: 1,

      loop: false,

      breakpoints: {
         0: {
            slidesPerView: 1,
         },

         680: {
            slidesPerView: 2,
         },
         1060: {
            slidesPerView: 3,
         }
      },
   });

   // img change

   document.querySelectorAll('.modal__waxom .modal__left-panel img').forEach(chooseImageWaxom);
   document.querySelectorAll('.modal__alivio .modal__left-panel img').forEach(chooseImageAlivio);
   document.querySelectorAll('.modal__laslesvpn .modal__left-panel img').forEach(chooseImageLasles);
   document.querySelectorAll('.modal__waxom .modal__left-panel picture source').forEach(chooseImageWaxom);
   document.querySelectorAll('.modal__alivio .modal__left-panel picture source').forEach(chooseImageAlivio);
   document.querySelectorAll('.modal__laslesvpn .modal__left-panel picture source').forEach(chooseImageLasles);

   function chooseImageWaxom(item) {
      item.addEventListener('mouseenter', showImageWaxom);
   };

   function showImageWaxom(e) {
      document.querySelector('.modal__waxom .modal__right-panel picture img').src = e.target.src;
      document.querySelector('.modal__waxom .modal__right-panel picture source').srcset = e.target.srcset;
   };

   function chooseImageAlivio(item) {
      item.addEventListener('mouseenter', showImageAlivio);
   };

   function showImageAlivio(e) {
      document.querySelector('.modal__alivio .modal__right-panel picture img').src = e.target.src;
      document.querySelector('.modal__alivio .modal__right-panel picture source').srcset = e.target.srcset;
   };

   function chooseImageLasles(item) {
      item.addEventListener('mouseenter', showImageLasles);
   };

   function showImageLasles(e) {
      document.querySelector('.modal__laslesvpn .modal__right-panel picture img').src = e.target.src;
      document.querySelector('.modal__laslesvpn .modal__right-panel picture source').srcset = e.target.srcset;
   };

   // multilang 
   const selectBody = document.querySelector('.select__body');
   const allLang = ['ru', 'ua', 'en'];
   let selectCurrent = document.querySelector('.select__current');
   let getURL = window.location.href;

   if (getURL.includes('ru')) {
      selectCurrent.innerHTML = 'Русский';
   } else if (getURL.includes('ua')) {
      selectCurrent.innerHTML = 'Українська';
   } else if (getURL.includes('en')) {
      selectCurrent.innerHTML = 'English';
   } else {
      selectCurrent.innerHTML = 'Русский';
   }

   selectBody.addEventListener('click', function (e) {
      let selectId;
      let target = e.target;

      selectId = target.getAttribute('id');
      let lang = selectId;
      location.href = window.location.pathname + '#' + lang;
      location.reload();
   });

   function changeLanguage() {
      let hash = window.location.hash;

      hash = hash.substr(1);

      if (!allLang.includes(hash)) {
         location.href = window.location.pathname + '#ru';
         location.reload();
      };

      for (let key in langArr) {
         let elem = document.querySelector('.lng-' + key);
         if (elem) {
            elem.innerHTML = langArr[key][hash];
         };
      };
   };

   changeLanguage();

   // mailer
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);

      if (error === 0) {
         form.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
            headers: {
               'Content-Type': 'application/json',
            },
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert('ERROR');
            form.classList.remove('_sending');
         }
      } else {
         alert('Fill required fields, please!');
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }

      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // Функция текста email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }

});
