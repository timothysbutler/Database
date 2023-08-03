// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

// Get the objects we need to modify
let updateSaleForm = document.getElementById('update-sale-form-ajax');

// Modify the objects we need
updateSaleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSaleID = document.getElementById("saleSelect");
    let inputPrice = document.getElementById("input-price-update");
    let inputEmployeeID = document.getElementById("input-employee_id-update");


    // Get the values from the form fields
    let saleIDValue = inputSaleID.value;
    let priceValue = inputPrice.value;
    let employeeIDValue = inputEmployeeID.value;

    
    // currently the database table for Sales does not allow updating values to NULL
    // so we must abort if being bassed NULL for any listed below
    if (priceValue == '') 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        sale_id: saleIDValue,
        price: priceValue,
        employee_id: employeeIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, saleIDValue);

            // Clear the input fields for another transaction
            inputSaleID.value = '';
            inputPrice.value = '';
            inputEmployeeID.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input. " + xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, saleID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == saleID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of price value
            let upprice = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign price to our value we updated to
            upprice.innerHTML = parsedData[0].price;

            // Get td of employee_id value
            let upemployeeid = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign employee_id to our value we updated to
            upemployeeid.innerHTML = parsedData[0].employee_id;

            // Refresh the page
            location.reload();

       }
    }
}