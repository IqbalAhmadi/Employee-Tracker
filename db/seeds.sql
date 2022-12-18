-- Department 
INSERT INTO depaertment (name)
VALUES ('Service'),
('Sales'),
('Engineering'),
('Legal'),
('Finance');

-- Role
INSERT INTO role (title, salary, department_id)
VALUES ('Customer Service Manager', 55000, 1),
('Customer Services', 35000, 1),
('Sales Manager', 61000, 2),
('Salesperson', 56000, 2),
('Engineering Manager', 90000, 3),
('Software Engineer', 80000, 3),
('Legal Team Manager', 99000, 4),
('Lawyer', 94000, 4),
('Finance Manager', 71000, 5),
('Accountant', 65000, 5);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rebecca', 'Smith', 1, NULL),
('Steve', 'Koko', 2, 1),
('Ibrahim', 'Ahmadi', 3, NULL),
('Hamza', 'Stanikzai', 4, 1),
('Iqbal', 'Ahmadi', 5, NULL),
('Ramin', 'Noorzada', 6, 1),
('Lucie', 'Graham', 7, NULL),
('Howard', 'Mitchum', 8, 1),
('Treighton', 'Mauldin', 9, NULL),
('Sam', 'Jaervinen', 10, 1);

