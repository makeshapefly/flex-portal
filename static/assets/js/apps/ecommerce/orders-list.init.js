/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: orders list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select.js';
import products from '../../../json/apps/ecommerce/orders-list.js';

// Orders table
const initialData = {
  qty: 1,
  price: 100.0
};
function productTable() {
  return {
    products: [],
    filteredProducts: [],
    openModal: false,
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    activeTab: 'All',
    errors: {},
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 10,
    filterStatus: '',
    showViewOrderForm: false,
    showAddOrderForm: false,
    showEditOrderForm: false,
    qty: 1,
    price: 100.0,
    form: {
      ordersID: '',
      customer_id: '',
      ordersDate: '',
      deliveredDate: '',
      customersName: '',
      productName: document.querySelector('#productNameSelect').value,
      qty: this.qty,
      price: this.price,
      total: (this.qty * this.price).toFixed(2),
      status: '',
      payment: ''
    },
    increaseQty() {
      this.form.qty++;
      this.updateTotal();
    },
    decreaseQty() {
      if (this.form.qty > 1) {
        this.form.qty--;
        this.updateTotal();
      }
    },
    updateTotal() {
      this.form.total = (this.form.qty * this.form.price).toFixed(2);
    },

    addOrder() {
      this.form.ordersID = 'PEO-' + (14521 + (this.products.length + 1)).toString();
      let productGet = document.querySelector('#productNameSelect').value;
      let paymentGet = document.querySelector('#paymentStatusSelect').value;
      let orderGet = document.querySelector('#orderStatusSelect').value;
      this.filteredProducts.unshift({
        ...this.form,
        productName: productGet,
        payment: paymentGet,
        status: orderGet,
        image: 'assets/images/products/img-25.png'
      });
      this.filteredProducts = this.products;
      this.showAddOrderForm = false;
    },
    editOrder(index) {
      this.handleModal('showEditOrderForm');
      this.form = { ...this.filteredProducts.find((product) => product.ordersID === index) };

      var productSelect = document.querySelector('#productNameSelect');
      var paymentSelect = document.querySelector('#paymentStatusSelect');
      var orderSelect = document.querySelector('#orderStatusSelect');
      productSelect?.setValue(this.form.productName);
      paymentSelect?.setValue(this.form.payment);
      orderSelect?.setValue(this.form.status);
    },
    updateOrder() {
      this.orderStatus('All');
      const index = this.filteredProducts.findIndex(
        (product) => product.ordersID === this.form.ordersID
      );
      let productGet = document.querySelector('#productNameSelect').value;
      let paymentGet = document.querySelector('#paymentStatusSelect').value;
      let orderGet = document.querySelector('#orderStatusSelect').value;
      this.products[index] = {
        ...this.form,
        productName: productGet,
        payment: paymentGet,
        status: orderGet
      };
      this.orderStatus(this.activeTab);
      paymentGet = '';
      orderGet = '';
      productGet = '';
      this.showEditOrderForm = false;
      this.showAddOrderForm = false;
    },

    validateForm() {
      this.errors = {};

      this.validateField('customersName', this.form.customersName, 'Full name is required.');
      this.validateField('price', this.form.price, 'Price is required.');
      this.validateField('ordersDate', this.form.ordersDate, 'Order date is required.');
      this.validateField('deliveredDate', this.form.deliveredDate, 'Delivered date is required.');

      // Validate productName using VirtualSelect
      const productNameSelect = document.querySelector('#productNameSelect');
      if (productNameSelect) {
        const productValue = productNameSelect.querySelector('input').value;
        this.validateField('productName', productValue, 'Product name is required.');
      } else {
        this.errors['productName'] = 'Product name Field not found.';
      }

      // Validate payment using VirtualSelect
      const paymentSelect = document.querySelector('#paymentStatusSelect');
      if (paymentSelect) {
        const paymentValue = paymentSelect.querySelector('input').value;
        this.validateField('payment', paymentValue, 'Payment is required.');
      } else {
        this.errors['payment'] = 'Payment Field not found.';
      }

      // Validate status using VirtualSelect
      const orderSelect = document.querySelector('#orderStatusSelect');
      if (orderSelect) {
        const orderValue = orderSelect.querySelector('input').value;
        this.validateField('status', orderValue, 'Status is required.');
      } else {
        this.errors['status'] = 'Status Field not found.';
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

    handleModal(modal) {
      if (modal === 'showAddOrderForm') {
        this.showAddOrderForm = true;
        this.showEditOrderForm = false;
        this.resetForm();
      } else if (modal === 'showEditOrderForm') {
        this.showEditOrderForm = true;
        this.showAddOrderForm = false;
        this.resetForm();
      } else {
        this.showEditOrderForm = false;
        this.showAddOrderForm = false;
      }
    },

    submitForm() {
      if (this.validateForm()) {
        if (this.showAddOrderForm) {
          this.addOrder();
        } else {
          this.updateOrder();
        }
        this.resetForm();
        document.body.classList.toggle('overflow-hidden', false);
        this.showEditOrderForm = false;
        this.showAddOrderForm = false;
      }
    },
    resetForm() {
      var productSelect = document.querySelector('#productNameSelect');
      var paymentSelect = document.querySelector('#paymentStatusSelect');
      var orderSelect = document.querySelector('#orderStatusSelect');
      productSelect?.setValue('');
      paymentSelect?.setValue('');
      orderSelect?.setValue('');
      this.errors = {};
      this.form = {
        ordersID: '',
        customer_id: '',
        ordersDate: '',
        deliveredDate: '',
        customersName: '',
        productName: productSelect,
        qty: 1,
        price: '',
        total: '',
        status: orderSelect,
        payment: paymentSelect
      };
    },
    reviewOrder(order) {
      this.selectedOrder = this.products.find((product) => product.ordersID === order);
    },

    deleteOrder(orderIndex) {
      this.filteredProducts.forEach((product, index) => {
        if (product.ordersID == orderIndex) {
          this.filteredProducts.splice(index, 1);
        }
      });
    },
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
        this.deleteOrder(item.ordersID);
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
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredProducts.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
    },
    init() {
      let startID = 14521; // Starting ID
      products.forEach((product, index) => {
        product.ordersID = 'PEO-' + (startID + index).toString();
      });
      this.products = products;
      this.orderStatus('All');
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
    orderStatus(status) {
      this.filterStatus = status;
      this.applyFilters();
    },
    applyFilters() {
      this.filteredProducts = [];
      this.products.forEach((product) => {
        if (product.status == this.filterStatus) {
          this.filteredProducts.push(product);
        } else if (this.filterStatus == 'All') {
          this.filteredProducts.push(product);
        }
        return this.filteredProducts;
      });
      if (this.sortBy) {
        this.filteredProducts.sort((a, b) => {
          const valueA = a[this.sortBy];
          const valueB = b[this.sortBy];
          let comparison = 0;
          if (valueA > valueB) {
            comparison = 1;
          } else if (valueA < valueB) {
            comparison = -1;
          }
          return this.sortDirection === 'desc' ? comparison * -1 : comparison;
        });
      }
      // Reset pagination
      this.currentPage = 1;
    },
    selectedOrder: {},
    openModal: false
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', productTable);
});

// Product Name Select
VirtualSelect.init({
  ele: '#productNameSelect',
  options: [
    { label: 'Denim Jacket', value: 'Denim Jacket' },
    { label: 'Leather Wallet', value: 'Leather Wallet' },
    { label: 'Wireless Headphones', value: 'Wireless Headphones' },
    { label: 'Sunglasses', value: 'Sunglasses' },
    { label: 'Backpack', value: 'Backpack' },
    { label: 'Winter Coat', value: 'Winter Coat' },
    { label: 'Handbag', value: 'Handbag' },
    { label: 'Sweater', value: 'Sweater' },
    { label: 'Sports Watch', value: 'Sports Watch' }
  ],
  allowNewOption: true
});

// Payment Status Select
VirtualSelect.init({
  ele: '#paymentStatusSelect',
  options: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' },
    { label: 'COD', value: 'COD' }
  ],
  allowNewOption: true
});

// Order Status Select
VirtualSelect.init({
  ele: '#orderStatusSelect',
  options: [
    { label: 'New', value: 'New' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Shipping', value: 'Shipping' },
    { label: 'Delivered', value: 'Delivered' }
  ],
  allowNewOption: true
});
