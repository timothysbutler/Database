--
-- Project Step 6
-- Group 147
-- Team Members: Jaron Moore, Timothy Butler
-- Project: The Back Nine
-- Course: CS 340 - Intro to Databases
--

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS `Golfers`;
CREATE TABLE Golfers ( 
    golfer_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    phone varchar(50) NOT NULL,
    email varchar(50),
    address varchar(255) NOT NULL,
    PRIMARY KEY (golfer_id)
);

INSERT INTO Golfers (first_name, last_name, phone, email, address)
VALUES ('John', 'Smith', '(654)-458-4458', 'Johnsmith23@gmail.com', '1455 Applegate Rd, Portland, OR 97035'),
('Jane', 'Smith', '(541)-854-2215', 'Janesmith1845@gmail.com', '1455 Applegate Rd, Portland, OR 97035'),
('Michael', 'Scott', '(785)-211-6584', 'themichaelscott@gmail.com', '1225 Warehouse Dr, Scranton, PA 18503'),
('Preston', 'Lane', '(885)-654-4567', 'plane@gmail.com', '126 South Barnett Rd, Medford, OR 97501'),
('Kevin', 'McDaniel', '(221)-477-7895', 'mcdaniel@gmail.com', '3069 Pinkerton Ln, Klamath Falls, OR 97603'),
('Frank', 'Johnson', '(185)-654-2365', NULL, '11 Old Town Rd, Medford, OR 97504');

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE Employees (
    employee_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    phone varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    address varchar(255) NOT NULL,
    PRIMARY KEY (employee_id)
);

INSERT INTO Employees (first_name, last_name, phone, email, address)
VALUES ('Jerry', 'Remington', '(578)-587-9874', 'remington1@gmail.com', '200 North Point Rd, Eagle Point, OR 97524'),
('Mary', 'Remington', '(578)-587-9875', 'remington2@gmail.com', '200 North Point Rd, Eagle Point, OR 97524'),
('Mark', 'McMann', '(541)-214-1745', 'Markthemcmann@hotmail.com', '855 Sterling Ct, Central Point, OR 97502'),
('Jennifer', 'Wittman', '(875)-411-9877', 'jennywittman@aol.com', '1155 Qual Point Dr, Klamath Falls, OR 97601');

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE Sales (
    sale_id int NOT NULL AUTO_INCREMENT,
    golfer_id int,
    price DECIMAL(19,2) NOT NULL,
    sale_date datetime NOT NULL,
    employee_id int,
    PRIMARY KEY (sale_id),
    FOREIGN KEY (golfer_id) REFERENCES Golfers(golfer_id) ON DELETE RESTRICT, 
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL
);

INSERT INTO Sales (golfer_id, price, sale_date, employee_id)
VALUES (5, 85.00, '2023-01-24', 1),
(4, 100.25, '2023-01-25', 1),
(2, 45.00, '2023-01-26', 2),
(1, 21.30, '2023-01-27', 3),
(3, 70.25, '2023-01-28', 3);

DROP TABLE IF EXISTS `Golfers_Has_Tee_Times`;
CREATE TABLE Golfers_Has_Tee_Times (
    golfers_golfer_id int NOT NULL,
    tee_times_tee_time_id int NOT NULL,
    PRIMARY KEY (golfers_golfer_id, tee_times_tee_time_id),
    FOREIGN KEY (golfers_golfer_id) REFERENCES Golfers(golfer_id) ON DELETE CASCADE,
    FOREIGN KEY (tee_times_tee_time_id) REFERENCES Tee_Times(tee_time_id) ON DELETE CASCADE
);

INSERT INTO Golfers_Has_Tee_Times (golfers_golfer_id, tee_times_tee_time_id)
VALUES (5, 1),
(6, 2),
(4, 3);

DROP TABLE IF EXISTS `Tee_Times`;
CREATE OR REPLACE TABLE Tee_Times (
    tee_time_id int NOT NULL AUTO_INCREMENT,
    party_size int NOT NULL,
    tee_time_date datetime NOT NULL,
    golfer_id int NOT NULL,
    PRIMARY KEY (tee_time_id),
    FOREIGN KEY (golfer_id) REFERENCES Golfers(golfer_id) ON DELETE CASCADE
);


INSERT INTO Tee_Times (tee_time_date ,party_size, golfer_id)
VALUES ('2023-03-25 06:00:00', 2, 5),
('2023-03-27 06:00:00', 2, 6),
('2023-03-22 07:00:00', 4, 4);

DROP TRIGGER IF EXISTS `insert_tee_time`;
CREATE TRIGGER `insert_tee_time` AFTER INSERT ON `Tee_Times`
FOR EACH ROW
INSERT INTO Golfers_Has_Tee_Times (golfers_golfer_id, tee_times_tee_time_id)
VALUES (NEW.golfer_id, NEW.tee_time_id);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;