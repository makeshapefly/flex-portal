/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: 3D Effect init Js File
*/

import '../../../../node_modules/vanilla-tilt/dist/vanilla-tilt';

VanillaTilt.init(document.querySelector('.your-element'), {
  max: 25,
  speed: 400
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll('.your-element'));
