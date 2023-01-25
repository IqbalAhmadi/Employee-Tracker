const inquirer = require('inquirer')
const db = require('./connection')

function questions() {
  inquirer
    .prompt([
      {
        name: 'prompt',
        type: 'list',
        message: 'EMPLOYEE MANAGER\n What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit application',
        ],
      },
    ])
    .then(function (response) {
      switch (response.prompt) {
        case 'View all departments':
          viewAllDepartment()
          break
        case 'View all roles':
          viewAllRoles()
          break
        case 'View all employees':
          viewAllEmployees()
          break
        case 'Add a department':
          addDepartment()
          break
        case 'Add a role':
          addRole()
          break
        case 'Add an employee':
          addEmployee()
          break
        case 'Update an employee role':
          updateEmpRole()
          break
        case 'Exit application':
          db.end()
          break
      }
    })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the new department?',
      },
    ])
    .then((data) => {
      db.query('Insert into department set?', {
        name: data.departmentName,
      })
      questions()
    })
}

function addRole() {
  db.query('SELECT * FROM department', (err, res) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title/name of the new role? ',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role? ',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department does the role belong to? ',
          choices: res.map((department) => department.name),
        },
      ])
      .then((data) => {
        const departmentName = res.find(
          (department) => department.name === data.department
        )
        db.query('INSERT INTO role set ?', {
          title: data.title,
          salary: data.salary,
          department_id: departmentName.id,
        })
        questions()
      })
  })
}

function addEmployee() {
  db.connect((err) => {
    if (err) throw err

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?",
        },
        {
          type: 'input',
          name: 'role_id',
          message: "What is the employee's role ID?",
        },
      ])
      .then((answers) => {
        db.query('INSERT INTO employee SET ?', answers, (err, res) => {
          if (err) throw err
          console.log('Employee added successfully.')
          db.end()
        })
      })
  })
}

function updateEmpRole() {
  db.connect((err) => {
    if (err) throw err

    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update? ",
            choices: employees.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
            type: 'input',
            name: 'role_id',
            message: 'What is the new role ID for this employee?',
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          )

          db.query(
            'UPDATE employee SET role_id = ? WHERE id= ?',
            [answers.role_id, employee.id],
            (err, res) => {
              if (err) throw err
              console.log('Employee updated successfully.')
            }
          )
        })
    })
  })
}

function viewAllDepartment() {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err
    console.table(res)
    questions()
  })
}

function viewAllRoles() {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err
    console.table(res)
    questions()
  })
}

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err
    console.table(res)
    questions()
  })
}

questions()
