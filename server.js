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
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee role',
          'Exit application',
        ],
      },
    ])
    .then(function (response) {
      switch (response.prompt) {
        case 'view all departments':
          viewAllDepartment()
          break
        case 'view all roles':
          viewAllRoles()
          break
        case 'view all employees':
          viewAllEmployees()
          break
        case 'add a department':
          addDepartment()
          break
        case 'add a role':
          addRole()
          break
        case 'add an employee':
          addEmployee()
          break
        case 'update an employee role':
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
        name: 'department',
        message: 'What is the name of the new department?',
      },
    ])
    .then((data) => {
      db.query('Insert  into department set? ', {
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
          name: 'title',
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
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          )

          db.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
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
