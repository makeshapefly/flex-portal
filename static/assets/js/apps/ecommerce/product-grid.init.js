/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: product grid init Js File
*/

import productGridData from '../../../json/apps/ecommerce/product-grid';

function productTable() {
  return {
    products: [],
    filteredProducts: [],
    showFilterModal: false,
    currentPage: 1,
    itemsPerPage: 8,
    deleteItem: '',
    searchTerm: '',
    filters: {
      categories: [],
      colors: [],
      priceRange: [],
      sortBy: ''
    },
    get totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredProducts.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredProducts.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
    },
    get selectedFilters() {
      // Update filters for categories and colors
      const filters = [];
      this.filters.categories = Array.from(
        document.querySelectorAll('[x-data="productCategory"] input[type=checkbox]:checked')
      ).map((checkbox) => checkbox.value);
      this.filters.colors = Array.from(
        document.querySelectorAll('[x-data="colorFilter"] input[type=checkbox]:checked')
      ).map((checkbox) => checkbox.value);
      this.filters.categories.forEach((cat) => filters.push(cat));
      this.filters.colors.forEach((color) => filters.push(color));
      filters.push(`${this.filters.priceRange[0]} - ${this.filters.priceRange[1]}`);

      return filters;
    },
    init() {
      this.products = productGridData;
      this.filteredProducts = productGridData;
      this.initPriceSlider();
    },
    initPriceSlider() {
      var arbitraryValuesSlider = document.getElementById('arbitrary-values-slider');
      var arbitraryValuesForSlider = ['$0', '$200', '$400', '$600', '$800', '$1000'];

      var format = {
        to: function (value) {
          return arbitraryValuesForSlider[Math.round(value)];
        },
        from: function (value) {
          return arbitraryValuesForSlider.indexOf(value);
        }
      };

      noUiSlider.create(arbitraryValuesSlider, {
        start: [1, 4], // Initial indices for $200 and $800
        range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
        tooltips: true,
        format: format,
        pips: { mode: 'steps', format: format, density: 50 }
      });

      arbitraryValuesSlider.noUiSlider.on('update', (values, handle) => {
        const minIndex = format.from(values[0]);
        const maxIndex = format.from(values[1]);
        this.filters.priceRange = [
          arbitraryValuesForSlider[minIndex],
          arbitraryValuesForSlider[maxIndex]
        ];
      });
    },
    applyFilters(event) {
      // Retrieve selected colors
      this.filters.categories = Array.from(
        document.querySelectorAll('[x-data="productCategory"] input[type=checkbox]:checked')
      ).map((checkbox) => checkbox.value);
      this.filters.colors = Array.from(
        document.querySelectorAll('[x-data="colorFilter"] input[type=checkbox]:checked')
      ).map((checkbox) => checkbox.value);

      this.filteredProducts = this.products;

      if (this.searchTerm.trim() !== '') {
        const query = this.searchTerm.toLowerCase().trim();
        this.filteredProducts = this.filteredProducts.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(query)
          );
        });
      }

      // Filter by categories
      if (this.filters.categories.length > 0) {
        this.filteredProducts = this.filteredProducts.filter((product) => {
          return this.filters.categories.includes(product.category);
        });
      }

      // Filter by colors
      if (this.filters.colors.length > 0) {
        this.filteredProducts = this.filteredProducts.filter((product) => {
          return this.filters.colors.includes(product.color);
        });
      }

      // Filter by price range
      const [minPrice, maxPrice] = this.filters.priceRange;
      this.filteredProducts = this.filteredProducts.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });

      // Sort the filtered products if needed
      if (this.filters.sortBy !== '') {
        if (this.filters.sortBy === 'priceAsc') {
          this.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (this.filters.sortBy === 'priceDesc') {
          this.filteredProducts.sort((a, b) => b.price - a.price);
        }
      }

      this.currentPage = 1;
      event.target.setAttribute('data-drawer-close', 'filterAside');
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    updateCategoryFilter(event) {
      const category = event.target.value;
      if (event.target.checked) {
        this.filters.categories.push(category);
      } else {
        this.filters.categories = this.filters.categories.filter((cat) => cat !== category);
      }
      this.applyFilters();
    },
    updateColorFilter(event) {
      const color = event.target.value;
      if (event.target.checked) {
        this.filters.colors.push(color);
      } else {
        this.filters.colors = this.filters.colors.filter((col) => col !== color);
      }
      this.applyFilters();
    },
    updateSortBy(event) {
      this.filters.sortBy = event.target.value;
      this.applyFilters();
    },
    clearFilters() {
      this.filters.categories = [];
      this.filters.colors = [];
      this.filters.priceRange = [0, 1000];
      this.filters.sortBy = '';
      this.filteredProducts = this.products;
      this.showFilterModal = false;
    },
    deleteProduct() {
      const index = this.filteredProducts.findIndex(
        (product) => product.productName === this.deleteItem.productName
      );
      if (index !== -1) {
        this.filteredProducts.splice(index, 1);
      }
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('productCategory', () => ({
    showMore: false,
    selectedCount: 0,
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    updateCountCategory(event) {
      this.selectedCount = event.target.checked ? this.selectedCount + 1 : this.selectedCount - 1;
    }
  }));

  Alpine.data('productTable', productTable);

  Alpine.data('colorFilter', () => ({
    showMore: false,
    selectedCount: 0,
    init() {
      this.selectedCount = Array.from(
        document.querySelectorAll('input[type=checkbox]:checked')
      ).length;
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    updateCountColor(event) {
      this.selectedCount = event.target.checked ? this.selectedCount + 1 : this.selectedCount - 1;
    }
  }));
});
