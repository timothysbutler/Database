// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGolferID = document.getElementById("input-golfer_id");
    let inputPrice = document.getElementById("input-price");
    let inputSaleDate = document.getElementById("input-sale_date");
    let inputEmployeeID = document.getElementById("input-employee_id");

    // Get the values from the form fields
    let golferIDValue = inputGolferID.value;
    let priceValue = inputPrice.value;
    let saleDateValue = inputSaleDate.value;
    let employeeIDValue = inputEmployeeID.value;

    // Put our data we want to send in a javascript object
    let data = {
        golfer_id: golferIDValue,
        price: priceValue,
        sale_date: saleDateValue,
        employee_id: employeeIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGolferID.value = '';
            inputPrice.value = '';
            inputSaleDate.value = '';
            inputEmployeeID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let golferFirstCell = document.createElement("TD");
    let golferLastCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let saleDateCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");



    // Fill the cells with correct data
    idCell.innerText = newRow.Sale;
    golferFirstCell.innerText = newRow.First;
    golferLastCell.innerText = newRow.Last;
    priceCell.innerText = newRow.Price;
    saleDateCell.innerText = newRow.Date_of_Sale;
    employeeIDCell.innerText = newRow.Employee;


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(golferFirstCell);
    row.appendChild(golferLastCell);
    row.appendChild(priceCell);
    row.appendChild(saleDateCell);
    row.appendChild(employeeIDCell);

    row.setAttribute('data-value', newRow.sale_id);

    // Add the row to the table
    currentTable.appendChild(row);

    
   
}