const mysql = require('mysql2')

let db = mysql.createConnection({
  user: 'root',
  password: '',
  port: 3306,
  host: 'localhost',
  database: 'employee_db',
})

db.connect((err) => {
  if (err) throw err
  console.log('server connected')
})

module.exports = db
