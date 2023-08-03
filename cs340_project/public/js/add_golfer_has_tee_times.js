// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

// Get the objects we need to modify
let addGolferHasTeeTimesForm = document.getElementById('add-golfer_has_tee_times-form-ajax');

// Modify the objects we need
addGolferHasTeeTimesForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGolferID = document.getElementById("input-golfer_id");
    let inputTeeTimeDate = document.getElementById("input-tee_time_date");
    


    // Get the values from the form fields
    let golferIDValue = inputGolferID.value;
    let teeTimeDateValue = inputTeeTimeDate.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        golfer_id: golferIDValue,
        tee_time_date: teeTimeDateValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-golfer_has_tee_times-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGolferID.value = '';
            inputTeeTimeDate.value = '';
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
    let currentTable = document.getElementById("golfer_has_tee_times-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let teeTimeDateCell = document.createElement("TD");
    let golferIDCell = document.createElement("TD");



    // Fill the cells with correct data
    idCell.innerText = newRow.tee_time_id;
    teeTimeDateCell.innerText = newRow.tee_time_date;
    golferIDCell.innerText = newRow.golfer_id;


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(teeTimeDateCell);
    row.appendChild(golferIDCell);

    row.setAttribute('data-value', newRow.tee_time_id);

    // Add the row to the table
    currentTable.appendChild(row);

    
   
}