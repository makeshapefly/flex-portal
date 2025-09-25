/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: product list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import productListData from '../../../json/apps/ecommerce/product-list';

// Product table
function productTable() {
  return {
    products: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    filteredProducts: [],
    deleteItem: '',
    currentPage: 1,
    itemsPerPage: 10,
    showAddForm: false,
    showEditForm: false,
    form: {
      productsID: '',
      description: '',
      productName: '',
      category: '',
      brandType: '',
      gender: '',
      stock: '',
      qty: '',
      size: '',
      colors: '',
      price: '',
      discount: '',
      payment: ''
    },
    searchTerm: '',
    selectedStatus: [],
    minPrice: 0,
    maxPrice: 100, // Ensure this matches the slider's max value
    publishedChecked: document.getElementById('publishedCheckboxFilter').checked,
    inactiveChecked: document.getElementById('inactiveCheckboxFilter').checked,

    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filteredProducts];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      } else {
        this.selectedItems.push(product);
      }
      this.selectAll = this.selectedItems.length === this.filteredProducts.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.productID;
        this.deleteProduct();
      });
      this.selectedItems = [];
      this.selectAll = false;
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
    filterProjects() {
      this.filteredProducts = this.products;
      const search = this.searchTerm.toLowerCase();
      if (search) {
        this.filteredProducts = this.filteredProducts.filter((product) => {
          return Object.values(product).some((value) =>
            value.toString().toLowerCase().includes(search)
          );
        });
      }
      const select = document.querySelector('#sampleSelect').value;
      if (select !== 'All' && select !== '') {
        this.filteredProducts = this.filteredProducts.filter((product) => {
          return product.category === select;
        });
      }
      if (this.selectedStatus) {
        if (this.selectedStatus == 'All') {
          this.filteredProducts = this.products;
        } else if (this.selectedStatus == 'Published') {
          this.filteredProducts = this.products.filter((product) => {
            return product.status === 'Published';
          });
        } else if (this.selectedStatus == 'Inactive') {
          this.filteredProducts = this.products.filter((product) => {
            return product.status === 'Inactive';
          });
        }
      }

      // Filter by price range
      this.filteredProducts = this.filteredProducts.filter((product) => {
        const price = parseFloat(product.price.replace('$', ''));
        return price >= this.minPrice && price <= this.maxPrice;
      });
    },
    submitForm() {
      this.filterProjects();
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredProducts.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
    },
    init() {
      let startID = 19115; // Starting ID
      productListData.forEach(async (product, index) => {
        product.productID = 'PEP-' + (startID + index).toString();
      });
      this.products = productListData;
      this.filterProjects();
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.filteredProducts.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
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
    toggleStatus(product) {
      product.status = product.status === 'Published' ? 'Inactive' : 'Published';
    },
    exportTable() {
      // Prepare table data for export
      let csvContent = 'data:text/csv;charset=utf-8,';

      // Add table headers
      const headers = Object.keys(this.products[0]).join(',');
      csvContent += headers + '\n';

      // Add table rows
      this.products.forEach((product) => {
        const values = Object.values(product).join(',');
        csvContent += values + '\n';
      });

      // Encode CSV content and create a download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'products.csv');
      document.body.appendChild(link);
      // Trigger the download
      link.click();
    },
    deleteProduct() {
      this.filteredProducts.forEach((product, index) => {
        if (product.productID == this.deleteItem) {
          this.filteredProducts.splice(index, 1);
        }
      });
    },
    initSlider() {
      var slider = document.getElementById('priceFilter');
      noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });

      slider.noUiSlider.on('update', (values, handle) => {
        this.minPrice = parseFloat(values[0]);
        this.maxPrice = parseFloat(values[1]);
      });
    }
  };
}

// Initialize Virtual Select
VirtualSelect.init({
  ele: '#sampleSelect',
  options: [
    { label: 'All', value: 'All' },
    { label: 'Watch', value: 'Watch' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Bags', value: 'Bags' },
    { label: 'Accessories', value: 'Accessories' }
  ]
});

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', productTable);
});
