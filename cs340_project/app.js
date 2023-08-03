// App.js
// Source from CS340 Starter Program:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/
// Updated to our specific naming of objects and values. The rest of the file is from the link above.

var express = require('express');   // We are using the express library for the web server
var app     = express();            
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.static('views'))
PORT        = 60115;                 // Set a port number

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { parseUrl } = require('mysql/lib/ConnectionConfig');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// GET ROUTES
app.get('/', (request, response) => {
    response.render('index',{
        style: 'index.css',
    });
});

app.get('/golfers', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.last_name === undefined)
    {
        query1 = "SELECT * FROM Golfers;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Golfers WHERE last_name LIKE "${req.query.last_name}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Golfers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the Golfers
        let Golfers = rows;
        
        return res.render('golfers', {data: Golfers, style: 'golfers.css'});
        
    })
});


app.get('/employees', (req, res) => 
{
    // Declare Query 1
    let query1;
    
    // If there is no query string, we just perform a basic SELECT
    if (req.query.last_name === undefined)
    {
        query1 = "SELECT * FROM Employees;";
    }    
    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Employees WHERE last_name LIKE "${req.query.last_name}%"`
    }
    
    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Employees;";
    
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
            
        // Save the Employees
        let Employees = rows;
            
        return res.render('employees', {data: Employees, style: 'employees.css'});    
            
    })
});

app.get('/sales', (req, res) =>{
    // Declare Query 1
    let query1;
    // If there is no query string, we just perform a basic SELECT
    if (req.query.sale_date === undefined)
    {
        query1 = "SELECT Sales.sale_id AS Sale, Golfers.first_name AS First, Golfers.last_name AS Last, Sales.price AS Price, Sales.sale_date AS Date_of_Sale, Sales.employee_id AS Employee FROM Sales INNER JOIN Golfers ON Sales.golfer_id = Golfers.golfer_id ORDER BY Sale;";
    }    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Sales WHERE sale_date LIKE "${req.query.sale_date}%"`
    }
    // Query 2 is the same in both cases
    let query2;
    // If there is no query string, we just perform a basic SELECT
    if (req.query.golfer_id === undefined)
    {
        query2 = "SELECT * FROM Golfers;";
    }    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query2 = `SELECT * FROM Sales WHERE golfer_id LIKE "${req.query.golfer_id}%"`
    }
    let query3;
    // If there is no query string, we just perform a basic SELECT
    if (req.query.employee_id === undefined)
    {
        query3 = "SELECT * FROM Employees;";
    }    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query3 = `SELECT * FROM Sales WHERE employee_id LIKE "${req.query.employee_id}%"`
    }
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        // Save the Sales
        let Sales = rows;
    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
        // Save the Golfers
        let Golfers = rows;
    db.pool.query(query3, (error, rows, fields) => {
        // Save the Employees
        let Employees = rows;
        return res.render('sales', {data: Sales, Golfers: Golfers, Employees: Employees, style: 'sales.css'});
            })
        })
    })
});


app.get('/tee_times', (req, res) => 
{
    // Declare Query 1
    let query1;
    
    // If there is no query string, we just perform a basic SELECT
    if (req.query.tee_time_date === undefined)
    {
        query1 = "SELECT * FROM Tee_Times;";
    }    
    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Tee_Times WHERE tee_time_date LIKE "${req.query.tee_time_date}%"`
    }
    
    // Query 2 is the same in both cases
    let query2;
    
    // If there is no query string, we just perform a basic SELECT
    if (req.query.golfer_id === undefined)
    {
        query2 = "SELECT * FROM Golfers;";
    }    
    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query2 = `SELECT * FROM Golfers WHERE golfer_id LIKE "${req.query.golfer_id}%"`
    }

 
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
            
        // Save the Tee Times
        let Tee_Times = rows;
    
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the Golfers
            let Golfers = rows;

            return res.render('tee_times', {data: Tee_Times, Golfers: Golfers, style: 'tee_times.css'});
            
        })
    })
}); 

app.get('/golfers_has_tee_times', (req, res) => 
{
    // Declare Query 1
    let query1;
    
    // If there is no query string, we just perform a basic SELECT
    if (req.query.tee_time_date === undefined)
    {
        query1 = "SELECT Golfers.first_name AS First, Golfers.last_name AS Last, Tee_Times.tee_time_date AS Tee_Time FROM Golfers_Has_Tee_Times INNER JOIN Golfers ON Golfers_Has_Tee_Times.golfers_golfer_id = Golfers.golfer_id INNER JOIN Tee_Times ON Golfers_Has_Tee_Times.tee_times_tee_time_id = Tee_Times.tee_time_id ORDER BY First";
    }    
    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Tee_Times WHERE tee_time_date LIKE "${req.query.tee_time_date}%"`
    }
    
    // Query 2 is the same in both cases
    let query2;
    
    // If there is no query string, we just perform a basic SELECT
    if (req.query.golfer_id === undefined)
    {
        query2 = "SELECT * FROM Golfers;";
    }    
    
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query2 = `SELECT * FROM Golfers WHERE golfer_id LIKE "${req.query.golfer_id}%"`
    }

 
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
            
        // Save the Golfers With Tee Times
        let golfers_has_tee_times = rows;
    
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the Golfers
            let Golfers = rows;

            return res.render('golfers_has_tee_times', {data: golfers_has_tee_times, Golfers: Golfers, style: 'golfers_has_tee_times.css'});
            
        })
    })
}); 

// POST ROUTES
app.post('/add-golfer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data.email);
    if (isNaN(email))
    {
        email = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Golfers (first_name, last_name, phone, email, address) VALUES ('${data.first_name}', '${data.last_name}', '${data.phone}', '${data.email}', '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Golfers
            query2 = `SELECT * FROM Golfers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data.email);
    if (isNaN(email))
    {
        email = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name, phone, email, address) VALUES ('${data.first_name}', '${data.last_name}', '${data.phone}', '${data.email}', '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (golfer_id, price, sale_date, employee_id) VALUES ('${data.golfer_id}', '${data.price}', '${data.sale_date}', '${data.employee_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT to display the table with names instead of ID's
            query2 = `SELECT Sales.sale_id AS Sale, Golfers.first_name AS First, Golfers.last_name AS Last, Sales.price AS Price, Sales.sale_date AS Date_of_Sale, Sales.employee_id AS Employee FROM Sales INNER JOIN Golfers ON Sales.golfer_id = Golfers.golfer_id ORDER BY Sale;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-tee_time-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Tee_Times (golfer_id, party_size, tee_time_date) VALUES ('${data.golfer_id}', '${data.party_size}', '${data.tee_time_date}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Tee Times
            query2 = `SELECT * FROM Tee_Times;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-golfer_has_tee_times-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Tee_Times (golfer_id, party_size, tee_time_date) VALUES ('${data.golfer_id}', 1, '${data.tee_time_date}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Golfers With Tee Times
            query2 = `SELECT * FROM Golfers_Has_Tee_Times;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// PUT ROUTES
app.put('/put-golfer-ajax', function(req,res,next)
{
    let data = req.body;
    
    let first_name = data.first_name;
    let last_name = data.last_name;
    let phone = data.phone;
    let email = data.email;
    let address = data.address;
    let golfer = data.golfer_id;


  
    let queryUpdateGolfer = `UPDATE Golfers SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ? WHERE golfer_id = ?`;
    

        // Run the query
        db.pool.query(queryUpdateGolfer, [first_name, last_name, phone, email, address, golfer], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Golfers
                query2 = `SELECT * FROM Golfers;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.put('/put-employee-ajax', function(req,res,next)
{
    let data = req.body;
        
    let first_name = data.first_name;
    let last_name = data.last_name;
    let phone = data.phone;
    let email = data.email;
    let address = data.address;
    let employee = data.employee_id;
    
    
      
    let queryUpdateEmployee = `UPDATE Employees SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ? WHERE employee_id = ?`;
        
    
        // Run the query
        db.pool.query(queryUpdateEmployee, [first_name, last_name, phone, email, address, employee], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Employees
                query2 = `SELECT * FROM Employees;`;
                db.pool.query(query2, function(error, rows, fields){
        
                    // If there was an error on the second query, send a 400
                    if (error) {
                            
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    })
;

app.put('/put-tee_time-ajax', function(req,res,next)
{
    let data = req.body;
        
    let tee_time_date = data.tee_time_date;
    let party_size = data.party_size;
    let tee_time = data.tee_time_id;
    
    
      
    let queryUpdateTeeTime = `UPDATE Tee_Times SET party_size = ?, tee_time_date = ? WHERE tee_time_id = ?`;
        
    
        // Run the query
        db.pool.query(queryUpdateTeeTime, [party_size, tee_time_date, tee_time], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Tee Times
                query2 = `SELECT * FROM Tee_Times;`;
                db.pool.query(query2, function(error, rows, fields){
        
                    // If there was an error on the second query, send a 400
                    if (error) {
                            
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    })
;

app.put('/put-sale-ajax', function(req,res,next)
{
    let data = req.body;
        
    let price = data.price;
    let employee_id = data.employee_id;
    let sale = data.sale_id;
    
    // Check if employee_id is equal to 'NULL'
    if (employee_id === 'NULL') {
        employee_id = null;
    }
      
    let queryUpdateSale = `UPDATE Sales SET price = ?, employee_id = ? WHERE sale_id = ?`;
        
    
        // Run the query
        db.pool.query(queryUpdateSale, [price, employee_id, sale], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT to display the data as names rather than ID's
                query2 = `SELECT Sales.sale_id AS Sale, Golfers.first_name AS First, Golfers.last_name AS Last, Sales.price AS Price, Sales.sale_date AS Date_of_Sale, Sales.employee_id AS Employee FROM Sales INNER JOIN Golfers ON Sales.golfer_id = Golfers.golfer_id ORDER BY Sale;`;
                db.pool.query(query2, function(error, rows, fields){
        
                    // If there was an error on the second query, send a 400
                    if (error) {
                            
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    })
;

// DELETE ROUTES
app.delete('/delete-golfer-ajax/', function(req,res,next){
    let data = req.body;
    let golferID = parseInt(data.id);
    let deleteGolfers = `DELETE FROM Golfers WHERE golfer_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteGolfers, [golferID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
  })});

app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Employees WHERE employee_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
  })});

app.delete('/delete-tee_time-ajax/', function(req,res,next){
    let data = req.body;
    let teeTimeID = parseInt(data.id);
    let deleteTeeTime = `DELETE FROM Tee_Times WHERE tee_time_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteTeeTime, [teeTimeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});