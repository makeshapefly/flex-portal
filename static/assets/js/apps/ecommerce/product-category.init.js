/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: product category init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import categoryData from '../../../json/apps/ecommerce/category-list';

//category table
function productTable() {
  return {
    products: [],
    filterProduct: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    searchTerm: '',
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 10,
    deleteItem: '',
    errors: {},
    imageUrl: '',
    showAddProductForm: true,
    showEditProductForm: false,
    productForm: {
      categoryID: '',
      image: '',
      category: '',
      description: '',
      product: '',
      status: ''
    },
    validateForm() {
      this.errors = {};
      this.validateField('categoryName', this.productForm.category, 'Category name is required.');
      this.validateField('description', this.productForm.description, 'Description is required.');
      // Validate VirtualSelect fields
      const statusSelect = document.querySelector('#statusSelect');
      if (statusSelect) {
        const statusValue = statusSelect.value; // Use value property directly
        if (!statusValue) {
          this.validateField('status', '', 'Status is required.');
        } else {
          this.validateField('status', statusValue, 'Status is required.');
        }
      } else {
        this.errors.status = 'Status field is not available.';
      }

      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        this.errors[fieldName] = errorMessage;
      } else {
        delete this.errors[fieldName];
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddProductForm) this.addProduct();
        else this.updateProduct();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditProductForm = false;
        this.showAddProductForm = true;
      }
    },
    addProduct() {
      this.productForm.categoryID = 'PEC-' + (19115 + this.filterProduct.length).toString();
      let status = document.querySelector('#statusSelect').value;
      if (this.productForm.image == '') {
        this.productForm.image = 'assets/images/products/img-01.png';
      }
      this.filterProduct.unshift({ ...this.productForm, status: status, products: 0 });
      this.filteredProduct();
    },
    editProduct(index) {
      this.productForm = { ...this.products.find((contact) => contact.categoryID === index) };
      var statusSelect = document.querySelector('#statusSelect');
      statusSelect?.setValue(this.productForm.status);
      this.showEditProductForm = true;
      this.showAddProductForm = false;
    },
    updateProduct() {
      const index = this.products.findIndex(
        (product) => product.categoryID === this.productForm.categoryID
      );
      let status = document.querySelector('#statusSelect').value;

      this.filterProduct[index] = { ...this.productForm, status: status };
      this.resetForm();
      this.showAddProductForm = true;
    },
    resetForm() {
      this.errors = {};
      this.productForm = {
        categoryID: '',
        image: '',
        category: '',
        description: '',
        product: '',
        status: document.querySelector('#statusSelect').setValue('')
      };
    },
    deleteProduct() {
      this.filterProduct.forEach((contact, index) => {
        if (contact.category == this.deleteItem) {
          this.filterProduct.splice(index, 1);
        }
      });
      this.resetForm();
      this.showEditProductForm = false;
      this.showAddProductForm = true;
    },
    filteredProduct() {
      this.filterProduct = this.products;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterProduct = this.filterProduct.filter((contact) => {
          return Object.values(contact).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filterProduct];
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
      this.selectAll = this.selectedItems.length === this.filterProduct.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.category;
        this.deleteProduct();
      });
      this.selectedItems = [];
      this.selectAll = false;
    },

    get totalPages() {
      return Math.ceil(this.filterProduct.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterProduct.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterProduct.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterProduct.length);
    },
    init() {
      let startID = 19115;
      categoryData.forEach((product, index) => {
        // Generate categoryID starting from "PEC-15015"
        product.categoryID = 'PEC-' + (startID + index).toString();
      });
      this.products = categoryData;
      this.filteredProduct();
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.products.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
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
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.productForm.image = src; // Update contact form image
      });
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

document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', productTable);
});

VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ]
});
