import { derived, writable, type Writable } from 'svelte/store';

export default class TableState {
  data: Writable<Data.TableData>;

  // Inialize the table data store
  constructor(data: Data.TableData) {
    const noOfoCols = data.columns.length;
    data.rows.forEach((row) => {
      if (Object.keys(row).length !== noOfoCols) {
        throw new Error('Data does not match columns');
      }
      Object.keys(row).forEach((key) => {
        if (!data.columns.includes(key)) {
          throw new Error('Data contains unknown column');
        }
      });
    });

    this.data = writable(data);

    this.sortData = this.sortData.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  private static sortBy(
    column: string,
    sortDir: Data.SortDirection,
    data: Data.TableRow[]
  ): Array<Data.TableRow> {
    return data.sort((a, b) => {
      if (a[column] === b[column] || a[column] === null || b[column] === null) {
        return 0;
      }
      if (sortDir === 'asc') {
        return a[column] < b[column] ? -1 : 1;
      }
      return a[column] > b[column] ? -1 : 1;
    });
  }
  columnTable = '';
  sortData(sortCol: string) {
    console.log(sortCol);
    this.columnTable = sortCol;
    this.data.update((data) => {
      data.sortDir = data.sortDir === 'asc' ? 'desc' : 'asc';
      data.rows = TableState.sortBy(sortCol, data.sortDir, data.rows);
      return data;
    });
  }

  getIcon() {
    return this.data.subscribe((data) => {
      return data.sortDir === 'asc'
        ? 'arrow-up'
        : data.sortDir === 'desc'
          ? 'arrow-down'
          : 'arrow-down-up';
    });
  }

  updateCell(value: Data.Cell, rowId: number, col: string) {
    this.data.update((data) => {
      const rowToUpdate = data.rows.find((row) => row.id === rowId);
      if (rowToUpdate) {
        rowToUpdate[col] = value;
        data.rows = data.rows.map((row) => (row.id === rowId ? rowToUpdate : row));
      }
      return data;
    });
  }

  deleteRow(rowId: number) {
    this.data.update((data) => {
      data.rows = data.rows.filter((row) => row.id !== rowId);
      return data;
    });
  }
}
