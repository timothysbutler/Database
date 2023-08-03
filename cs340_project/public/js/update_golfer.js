// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

// Get the objects we need to modify
let updateGolferForm = document.getElementById('update-golfer-form-ajax');

// Modify the objects we need
updateGolferForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGolferID = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("input-first_name-update");
    let inputLastName = document.getElementById("input-last_name-update");
    let inputPhone = document.getElementById("input-phone-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputAddress = document.getElementById("input-address-update");

    // Get the values from the form fields
    let golferIDValue = inputGolferID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;
    let addressValue = inputAddress.value;
    
    // If any of the inputs are left blank, then we return. Meaning they need to be filled out
    if (firstNameValue == '') 
    {
        return;
    }
    if (lastNameValue == '') 
    {
        return;
    }
    if (phoneValue == '') 
    {
        return;
    }
    if (emailValue == '') 
    {
        return;
    }
    if (addressValue == '') 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        golfer_id: golferIDValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone: phoneValue,
        email: emailValue,
        address: addressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-golfer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, golferIDValue);

            // Clear the input fields for another transaction
            inputGolferID.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPhone.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input. " + xhttp.status)
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, golferID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("golfer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == golferID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of first name value
            let upfirstname = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign first name to our value we updated to
            upfirstname.innerHTML = parsedData[0].first_name;

            // Get td of last name value
            let uplastname = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign phone to our value we updated to
            uplastname.innerHTML = parsedData[0].last_name;

            // Get td of phone value
            let upphone = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign phone to our value we updated to
            upphone.innerHTML = parsedData[0].phone;

            // Get td of email value
            let upemail = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign email to our value we updated to
            upemail.innerHTML = parsedData[0].email;

            // Get td of address value
            let upaddress = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign address to our value we updated to
            upaddress.innerHTML = parsedData[0].address;

            // Refresh the page
            location.reload();
       }
    }
}