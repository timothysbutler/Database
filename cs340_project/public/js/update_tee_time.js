// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

// Get the objects we need to modify
let updateTeeTimeForm = document.getElementById('update-tee_time-form-ajax');

// Modify the objects we need
updateTeeTimeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeeTimeID = document.getElementById("tee_timeSelect");
    let inputTeeTimeDate = document.getElementById("input-tee_time_date-update");
    let inputPartySize = document.getElementById("input-party_size-update");
    

    // Get the values from the form fields
    let teeTimeIDValue = inputTeeTimeID.value;
    let teeTimeDateValue = inputTeeTimeDate.value;
    let partySizeValue = inputPartySize.value;
    
    // currently the database table for Tee Times does not allow updating values to NULL
    // so we must abort if being bassed NULL for any listed below
    if (teeTimeDateValue == '') 
    {
        return;
    }
    if (partySizeValue == '') 
    {
        return;
    }
    


    // Put our data we want to send in a javascript object
    let data = {
        tee_time_id: teeTimeIDValue,
        tee_time_date: teeTimeDateValue,
        party_size: partySizeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-tee_time-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, teeTimeIDValue);

            // Clear the input fields for another transaction
            inputTeeTimeID.value = '';
            inputTeeTimeDate.value = '';
            inputPartySize.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input. " + xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, teeTimeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("tee_times-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == teeTimeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of first name value
            let uppartysize = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign phone to our value we updated to
            uppartysize.innerHTML = parsedData[0].party_size;

            // Get td of last name value
            let updatetime = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign phone to our value we updated to
            updatetime.innerHTML = parsedData[0].tee_time_date;

            // Refresh the page
            location.reload();

       }
    }
}