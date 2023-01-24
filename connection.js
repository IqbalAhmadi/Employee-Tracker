const mysql = require('mysql2')

let db = mysql.createConnection({
  user: 'root',
  password: '',
  port: 3306,
  host: '127.0.0.1',
  database: 'employee_db',
})

db.connect((err) => {
  if (err) throw err
  console.log('server connected')
})

module.exports = db
