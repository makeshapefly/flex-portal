// ES6 import
import simpleParallax from 'simple-parallax-js';

var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image, {
    delay: .8,
    spaceBetween: 30,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: true,
});

const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();