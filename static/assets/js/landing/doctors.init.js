/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: doctors init Js File
*/

// parallax js
import simpleParallax from 'simple-parallax-js';

var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image, {
  delay: 0.8,
  spaceBetween: 30,
  transition: 'cubic-bezier(0,0,0,1)',
  overflow: true
});

//swiper js
import Swiper from 'swiper';

var swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1199: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
});
