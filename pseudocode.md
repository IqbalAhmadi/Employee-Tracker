<!-- TODO:

**** Pachakges ******
    * Install npm i (Done)
    * Run mysql -u root (Done)
    * Install npm install console.table --save (Done)
    * Install npm install --save mysql2 (Done)
    * Install npm install inquirer (Done)

**** Creaing files ******
1. Create a db folder that contains the following files:
    * schema.sql
    * query.sql
    * seeds.sql

    -- Create server.js file (Done)---

    Done 👆 with creating folder & files

2. Create schema files that contains the following three tables:

>> department

    * id: INT PRIMARY KEY

    * name: VARCHAR(30) to hold department name

>> role

    * id: INT PRIMARY KEY

    * title: VARCHAR(30) to hold role title

    * salary: DECIMAL to hold role salary

    * department_id: INT to hold reference to department role belongs to

>> employee

    * id: INT PRIMARY KEY

    * first_name: VARCHAR(30) to hold employee first name

    * last_name: VARCHAR(30) to hold employee last name

    * role_id: INT to hold reference to employee role

    * manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

    Done 👆 with creating tables




-->
