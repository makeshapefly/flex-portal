/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: orders track maps init Js File
*/

// line style
const lineMap = new jsVectorMap({
  selector: '#lineStyleMap',
  map: 'world',
  lineStyle: {
    stroke: '#676767',
    strokeWidth: 1.5,
    fill: '#ff5566',
    fillOpacity: 1,
    strokeDasharray: '6 3 6', // OR: [6, 2, 6]
    animation: true // Enables animation
  },
  markers: [
    {
      name: 'Brazil',
      coords: [-14.235, -51.9253], // Brazil coordinates
      style: { fill: 'red' }
    },
    {
      name: 'New Mexico',
      coords: [34.9727, 105.0324],
      style: { fill: 'purple' }
    }
  ],
  lines: [{ from: 'Brazil', to: 'New Mexico' }]
});

//Orders table
import orderData from '../../../json/apps/ecommerce/orders-recent';
function ordersTable() {
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
    currentPage: 1,
    itemsPerPage: 4,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.products] : [];
    },
    get totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.products.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.products.length);
    },
    init() {
      let startID = 14521; // Starting ID
      orderData.forEach((product, index) => {
        product.ordersID = 'PEO-' + (startID + index).toString();
      });
      this.products = orderData;
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
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('ordersTable', ordersTable);
});
