/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: datatables bordered init Js File
*/
import employeesData from '../../json/table/employees';
function fetchEmployees() {
  const employeesTable = document.getElementById('example');
  const tbody = employeesTable.querySelector('tbody');
  tbody.innerHTML = ''; // Clear previous data

  employeesData.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
                    <td>${employee.Name}</td>
                    <td>${employee.Position}</td>
                    <td>${employee.Office}</td>
                    <td>${employee.Age}</td>
                    <td>${employee['Start date']}</td>
                    <td>${employee.Salary}</td>
                `;
    tbody.appendChild(row);
  });

  // Initialize DataTable after loading data
  new DataTable('#example', {
    responsive: true
  });
}

fetchEmployees();
