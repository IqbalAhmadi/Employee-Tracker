DROP DATABASE IF EXISTS manager_db;
-- creating 'manager_db' databas -- 
CREATE DATABASE manager_db;

USE manager_db;

-- Depaetment Table within 'manager_db'
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Role Table within 'manager_db'
CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL,
    FOREIGN KEY (department_id),
    REFERENCES department(id),
);

-- Employee Table within 'manager_db'
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    manager_id INT NOT NULL

);