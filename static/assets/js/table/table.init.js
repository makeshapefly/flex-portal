const app = () => {
    return {
        data: [
            { name: 'Jeremy McMullen', age: 37, date: '21 Jan, 2024', address: 'United States', salary: 15236, editable: null },
            { name: 'Charles Fischer', age: 29, date: '28 Jan, 2024', address: 'Romania', salary: 8563, editable: null },
            { name: 'Louise Harms', age: 32, date: '02 Feb, 2024', address: 'Canada', salary: 7986, editable: null },
            { name: 'Henry Boyle', age: 34, date: '11 Feb, 2024', address: 'Germany', salary: 36322, editable: null },
            { name: 'John Brown', age: 26, date: '20 Feb, 2024', address: 'Mexico', salary: 11741, editable: null }
        ],
        sortColumn: '',
        sortDirection: 'asc',
        sortBy(column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }
        },
        sortedData() {
            if (!this.sortColumn) return this.data;
            return this.data.slice().sort((a, b) => {
                if (typeof a[this.sortColumn] === 'string') {
                    return this.sortDirection === 'asc' ? a[this.sortColumn].localeCompare(b[this.sortColumn]) : b[this.sortColumn].localeCompare(a[this.sortColumn]);
                } else {
                    return this.sortDirection === 'asc' ? a[this.sortColumn] - b[this.sortColumn] : b[this.sortColumn] - a[this.sortColumn];
                }
            });
        },
        sortIcon(column) {
            if (this.sortColumn === column) {
                return this.sortDirection === 'asc' ? 'arrow-down' : 'arrow-up';
            } else {
                return 'arrow-down-up';
            }
        },
        toggleEdit(index) {
            if (this.data[index].editable === null)
                this.data[index].editable = index;
            else
                this.data[index].editable = null;
        },
        updateValue(value, column, index) {
            this.data[index][column] = value;
        },
        removeItem(index) {
            this.data.splice(index, 1);
        }
    };
};

window.addEventListener('DOMContentLoaded', () => {
    Alpine.data('app', app);
});
