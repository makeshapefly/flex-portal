/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: product create init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

//category Select
VirtualSelect.init({
  ele: '#categorySelect',
  options: [
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Fruits', value: 'fruits' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Bags', value: 'Bags' },
    { label: 'Watch', value: 'Watch' }
  ],
  categorySelect: true,
  allowNewOption: true
});

//category Select
VirtualSelect.init({
  ele: '#brandTypeSelect',
  options: [
    { label: 'Gucci', value: 'Gucci' },
    { label: 'Rolex', value: 'Rolex' },
    { label: 'Calvin Klein', value: 'Calvin Klein' },
    { label: 'Zara', value: 'Zara' },
    { label: 'Nike', value: 'Nike' },
    { label: 'Adidas', value: 'Adidas' }
  ],
  brandTypeSelect: true,
  allowNewOption: true
});

VirtualSelect.init({
  ele: '#sizeSelect',
  options: [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: '2XL', value: '2XL' }
  ],
  multiple: true,
  showValueAsTags: true
});

//color select
VirtualSelect.init({
  ele: '#colorsSelect',
  options: [
    { label: 'Blue', value: 'Blue' },
    { label: 'Green', value: 'Green' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'Sky', value: 'Sky' },
    { label: 'Red', value: 'Red' },
    { label: 'Pink', value: 'Pink' },
    { label: 'Gray', value: 'Gray' },
    { label: 'Purple', value: 'Purple' }
  ],
  dropboxWrapper: 'body',
  multiple: true,
  showValueAsTags: true
});

//product images preview
function previewImage() {
  return {
    imageUrl: '',

    fileChosen(event) {
      this.fileToDataUrl(event, (src) => (this.imageUrl = src));
    },

    fileToDataUrl(event, callback) {
      if (!event.target.files.length) return;

      let file = event.target.files[0],
        reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => callback(e.target.result);
    }
  };
}

//product slider
var swiper = new Swiper('.productSlider', {
  pagination: {
    clickable: true,
    el: '.swiper-pagination'
  }
});

//price calculation
function priceCalculator() {
  return {
    price: '',
    discount: '',
    validateNumber(event) {
      const input = event.target;
      const regex = /^[0-9]*$/;
      if (!regex.test(input.value)) {
        input.value = input.value.slice(0, -1);
      }
    },
    get sellingPrice() {
      let price = parseFloat(this.price);
      let discount = parseFloat(this.discount);
      if (isNaN(price) || isNaN(discount) || discount < 0 || discount > 100) {
        return '$00.00';
      } else {
        let sellingPrice = price * (1 - discount / 100);
        return '$' + sellingPrice.toFixed(2);
      }
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('previewImage', previewImage);
  Alpine.data('priceCalculator', priceCalculator);
});
