/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: swiper init Js File
*/

//basic
var swiper = new Swiper('.mySwiper', {});
//Pagination dynamic
var swiper = new Swiper('.paginationDynamicSlider', {
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true
  }
});
//Pagination
var swiper = new Swiper('.pagination-swiper', {
  pagination: {
    clickable: true,
    el: '.swiper-pagination'
  }
});
//Grab cursor
var swiper = new Swiper('.grabCursorSlider', {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    375: {
      slidesPerView: 1.5,
      spaceBetween: 20
    },
    557: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});
//Vertical
var swiper = new Swiper('.verticalSlider', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
//Slides per view
var swiper = new Swiper('.slidersPerView', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    375: {
      slidesPerView: 1.5,
      spaceBetween: 20
    },
    557: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

var swiper = new Swiper('.cardSwiper', {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    375: {
      slidesPerView: 1.5,
      spaceBetween: 20
    },
    557: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});
