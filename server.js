const express = require('express')
// import and require mysql2
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password
    password: '',
    database: 'manager_db',
  },
  console.log(`Connected to the manager_db database.`)
)

// Create a department
// TODO: THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name)
    VALUES (?)`
  const params = [body.department_name]

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: body,
    })
  })
})

// Create a role
app.post('/api/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (role_name)
    VALUES (?)`
  const params = [body.role_name]

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: body,
    })
  })
})

// Create an employee
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (employee_name)
    VALUES (?)`
  const params = [body.employee_name]

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: body,
    })
  })
})

// Read all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT id, department_name AS title FROM department`

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

// Read all roles
app.get('/api/role', (req, res) => {
  const sql = `SELECT id, role_name AS title FROM role`

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

// Read all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT id, employee_name AS title FROM employee`

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

// Update department name
app.put('/api/department/:id', (req, res) => {
  const sql = `UPDATE department SET departments = ? WHERE id = ?`
  const params = [req.body.department, req.params.id]

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found 😔',
      })
    } else {
      res.json({
        message: 'success 👏🏼',
        data: req.body,
        changes: result.affectedRows,
      })
    }
  })
})

// Update role name
app.put('/api/role/:id', (req, res) => {
  const sql = `UPDATE role SET role = ? WHERE id = ?`
  const params = [req.body.role, req.params.id]

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found 😔',
      })
    } else {
      res.json({
        message: 'success 👏🏼',
        data: req.body,
        changes: result.affectedRows,
      })
    }
  })
})

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
