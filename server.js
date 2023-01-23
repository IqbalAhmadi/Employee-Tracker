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

// const consoleTable = require('console.table')

// const express = require('express')
// const { default: inquirer } = require('inquirer')
// // import and require mysql2
// const mySQL = require('mysql2')

// const PORT = process.env.PORT || 3001

// // Express middleware
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

//! Old codes
// connect to database
// const db = mySQL.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username
//     user: 'root',
//     // MySQL password
//     password: '',
//     database: 'employee_db',
//   },
//   console.log('Connected to the employee_db database.')
// )

// // Creating propmt object query
// const initPrompt = [
//   {
//     type: 'list',
//     name: 'initAction',
//     message: 'What would you like to do?',
//     choices: [
//       'view all departments',
//       'view all roles',
//       'view all employees',
//       'add a department',
//       'add a role',
//       'add an employee',
//       'update an employee role',
//       'Exit application',
//     ],
//   },
// ]

// const departmentPrompt = [
//   {
//     type: 'input',
//     name: 'depName',
//     message: 'What is the name of the department?',
//   },
// ]
// const deptQuery = async () => {
//   const res = await iq.prompt(departmentPrompt)
//   db.query(`INSERT INTO department (name) VALUES ('${res.depName}')`)
//   init()
// }

// const roleQuery = async (data) => {
//   const res = await iq.prompt([
//     {
//       type: 'input',
//       name: 'roleName',
//       message: 'What is the name of the role?',
//     },
//     {
//       type: 'number',
//       name: 'salary',
//       messsage: 'What is the salary for this role?',
//     },
//     {
//       type: 'list',
//       name: 'depRole',
//       choices: data,
//     },
//   ])

//   var roleID = data.find((element) => {
//     return element.name === res.depRole
//   })
//   db.query(
//     `INSERT INTO role (title, salary, department_id) VALUES('${res.roleName}', '${res.salary}', ${roleID.id})`,
//     function (err, res) {
//       init()
//     }
//   )
// }

// const employeeQuery = async (data, data2) => {
//   const res = await iq.prompt([
//     {
//       type: 'input',
//       name: 'empFirstName',
//       message: "What is the employee's first name?",
//     },
//     {
//       type: 'input',
//       name: 'empLastName',
//       message: "What is the employee's first name?",
//     },
//     {
//       type: 'list',
//       name: 'empRole',
//       message: "What is the employee's role?",
//       choices: data2,
//     },
//     {
//       type: 'list',
//       name: 'emplMgr',
//       message: "Who is the employee's manager?",
//       choices: data,
//     },
//   ])

//   var hasManager = data.find((element) => {
//     return element.name === res.emplMgr
//   })

//   var hasRole = data2.find((el) => {
//     return el.name === res.empRole
//   })
//   db.query(
//     `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.empFirstName}', '${res.empLastName}', ${hasRole.id}, ${hasManager.id}`,
//     function (err, res) {
//       init()
//     }
//   )
// }

// const updateQuery = async (data, data2) => {
//   const res = await iq.prompt([
//     {
//       type: 'list',
//       name: 'updateEmp',
//       message: 'Which employee would you like to update?',
//       choices: data,
//     },
//     {
//       type: 'list',
//       name: 'updateEmpRole',
//       message: "What is the employee's new role?",
//       choices: data2,
//     },
//   ])

//   const empEl = data.find((el) => {
//     return el.name === res.updateEmp
//   })

//   const empElID = empEl.id

//   const roleEl = data2.find((el) => {
//     return el.name === res.updateEmpRole
//   })

//   const roleElID = roleEl.id
//   const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
//   const params = [roleElID, empElID]
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.error(err)
//     } else {
//       init()
//     }
//   })
// }

// const init = async () => {
//   const res = await iq.prompt(initPrompt)
//   if (res.initAction === 'view all departments') {
//     db.query('SELECT * FROM department', function (err, result) {
//       console.table(result)
//       init()
//     })
//   }
//   if (res.initAction === 'view all roles') {
//     db.query(
//       'SELECT role.id, role.title, role.salary FROM role LEFT JOIN department ON role.department_id = department.id',
//       function (err, result) {
//         console.table(result)
//         init()
//       }
//     )
//   }
//   if (res.initAction === 'view all employees') {
//     db.query(
//       'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(Manager.first_name, " ", Manager.last_name) as manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee as Manager ON employee.manager_id = Manager.id',
//       function (err, result) {
//         console.table(result)
//         init()
//       }
//     )
//   }
//   if (res.initAction === 'add a department') {
//     console.log('running department prompt...')
//     deptQuery()
//   }
//   if (res.initAction === 'add a role') {
//     console.log('running role prompt...')
//     db.query('SELECT * FROM department', function (err, res) {
//       roleQuery(res)
//     })
//   }
//   if (res.initAction === 'add an employee') {
//     console.log('running employee prompt...')
//     db.query(
//       'SELECT CONCAT (employee.first_name, " ", employee.last_name) as name, employee.id FROM employee WHERE manager_id IS NULL',
//       function (err, res) {
//         db.query('SELECT title as name, id FROM role', function (err, res2) {
//           employeeQuery(res, res2)
//         })
//       }
//     )
//   }
//   if (res.initAction === 'update an employee role') {
//     console.log('running update prompt...')
//     db.query(
//       'SELECT CONCAT(employee.first_name, " ", employee.last_name) as name, manager_id, role_id, id FROM employee',
//       function (err, empRes) {
//         db.query('SELECT title as name, id FROM role', function (err, roleRes) {
//           if (err) {
//             console.error(err)
//           }
//           updateQuery(empRes, roleRes)
//         })
//       }
//     )
//   }
//   if (res.initAction === 'Exit application') {
//     return exit()
//   }
//   return
// }

// init()

//! OLD CODES 👇

// // Create a department
// app.post('/api/new-department', ({ body }, res) => {
//   const sql = `INSERT INTO department (department_name)
//     VALUES (?)`
//   const params = [body.department_name]

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: body,
//     })
//   })
// })

// // Create a role
// app.post('/api/new-role', ({ body }, res) => {
//   const sql = `INSERT INTO role (role_name)
//     VALUES (?)`
//   const params = [body.role_name]

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: body,
//     })
//   })
// })

// // Create an employee
// app.post('/api/new-employee', ({ body }, res) => {
//   const sql = `INSERT INTO employee (employee_name)
//     VALUES (?)`
//   const params = [body.employee_name]

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: body,
//     })
//   })
// })

// // Read all departments
// app.get('/api/department', (req, res) => {
//   const sql = `SELECT id, department_name AS title FROM department`

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: rows,
//     })
//   })
// })

// // Read all roles
// app.get('/api/role', (req, res) => {
//   const sql = `SELECT id, role_name AS title FROM role`

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: rows,
//     })
//   })
// })

// // Read all employees
// app.get('/api/employee', (req, res) => {
//   const sql = `SELECT id, employee_name AS title FROM employee`

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message })
//       return
//     }
//     res.json({
//       message: 'success',
//       data: rows,
//     })
//   })
// })

// // Update department name
// app.put('/api/department/:id', (req, res) => {
//   const sql = `UPDATE department SET departments = ? WHERE id = ?`
//   const params = [req.body.department, req.params.id]

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message })
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Department not found 😔',
//       })
//     } else {
//       res.json({
//         message: 'success 👏🏼',
//         data: req.body,
//         changes: result.affectedRows,
//       })
//     }
//   })
// })

// // Update role name
// app.put('/api/role/:id', (req, res) => {
//   const sql = `UPDATE role SET role = ? WHERE id = ?`
//   const params = [req.body.role, req.params.id]

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message })
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Role not found 😔',
//       })
//     } else {
//       res.json({
//         message: 'success 👏🏼',
//         data: req.body,
//         changes: result.affectedRows,
//       })
//     }
//   })
// })

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end()
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
