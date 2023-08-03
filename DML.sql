-- Timothy Butler
-- Jaron Moore
-- CS 340 - 400

-- Golfers
-- View all Golfers
SELECT * from Golfers;

-- Add new Golfer
INSERT INTO Golfers (first_name, last_name, phone, email, address)
VALUES (:first_name, :last_name, :phone, :email, :address);

-- Delete Golfer
DELETE FROM Golfers WHERE golfer_id = :golfer_id;

-- Update Golfer
UPDATE Golfers
   SET first_name = :first_name, last_name = :last_name, 
       phone = :phone, email = :email, address =  :address
WHERE golfer_id = :golfer_id;

-- Add new Golfer
INSERT INTO Golfers (first_name, last_name, phone, email, address)
VALUES (:first_name, :last_name, :phone, :email, :address);

-- Delete Golfer
DELETE FROM Golfers WHERE golfer_id = :golfer_id;

-- Update Golfer
UPDATE Golfers
   SET first_name = :first_name, last_name = :last_name, 
       phone = :phone, email = :email, address =  :address
WHERE golfer_id = :golfer_id;


-- Golfers_Has_Tee_Times
-- View all Golfers_Has_Tee_Times with Golfer's name and their tee_times
SELECT Golfers.first_name AS First, Golfers.last_name AS Last, Tee_Times.tee_time_date AS Tee_time
FROM Golfers_Has_Tee_Times
INNER JOIN Golfers ON Golfers_Has_Tee_Times.golfers_golfer_id = Golfers.golfer_id
INNER JOIN Tee_Times ON Golfers_Has_Tee_Times.tee_times_tee_time_id = Tee_Times.tee_time_id
ORDER BY First;


-- Tee Times
-- View all Tee Times
SELECT * from Tee_Times;

-- Add a Tee Time
INSERT INTO Tee_Times (group_num, tee_time_date ,party_size, golfer_id)
VALUES (:group_num, :tee_time_date , :party_size, :golfer_id);

-- Delete a Tee Time
DELETE FROM Tee_Times WHERE tee_time_id = :tee_time_id

-- Update a Tee Time
UPDATE Tee_Times
   SET group_num = :group_num, tee_time_date = :tee_time_date, 
       party_size = party_size, golfer_id = :golfer_id
WHERE tee_time_id = :tee_time_id


-- Sales
-- View all Sales
SELECT * from Sales;

-- Add new Sale
INSERT INTO Sales (golfer_id, price, sale_date, employee_id)
VALUES (:golfer_id, :price, :sale_date, :employee_id);

-- Update a Sale
UPDATE Sales
   SET golfer_id = :golfer_id, price = :price, 
       sale_date = :sale_date, employee_id = :employee_id
WHERE sale_id = :sale_id


-- Employees
-- View all Employees
SELECT * from Employees;

-- Add new Employee
INSERT INTO Employees (first_name, last_name, phone, email, address)
VALUES (:first_name, :last_name, :phone, :email, :address);

-- Delete Employee
DELETE FROM Employees WHERE employee_id = :employee_id;

-- Update Employee
UPDATE Employees
   SET first_name = :first_name, last_name = :last_name, 
       phone = :phone, email = :email, address =  :address
WHERE employee_id = :employee_id;