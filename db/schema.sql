DROP DATABASE IF EXISTS employee_db;
-- creating 'employee_db' databas -- 
CREATE DATABASE employee_db;

USE employee_db;

-- Department Table within 'employee_db'
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Role Table within 'employee_db'
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL,
    -- FOREIGN KEY (department_id)
    -- REFERENCES department(id)
    -- ON DELETE CASCADE
);

-- Employee Table within 'employee_db'
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    -- FOREIGN KEY (role_id)
    -- REFERENCES role(id)
    -- ON DELETE CASCADE,
    -- FOREIGN KEY (manager_id)
    -- REFERENCES employee(id)
    -- ON DELETE CASCADE
);