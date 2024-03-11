const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 3000;

require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));


// show main page as list data
app.get('/location', (req, res) => {
  res.sendFile('location/index.html')
})

// SELECT ALL
app.get('/location/list', (req, res) => {
  pool.query('SELECT * FROM location', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});


// SELECT ONE
app.get('/location/json/:id', (req, res) => {

  var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n' + sql);
    } else {
      res.json(results)
    }
  });
});

// ADD or UPDATE
app.post('/location/insert', (req, res) => {
  const { location_id, location_name } = req.body;
  let sql = 'INSERT INTO location (location_name) VALUES (?)';
  let params = [location_name]

  if (location_id > 0 ) {
    sql = 'UPDATE location SET location_name = ? WHERE location_id=?';
    params = [location_name, location_id]
  }
  console.log(params)

  // Execute the query with the provided data
  pool.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let url = '/location/detail.html?id=' + (location_id == ""  ? result.insertId : location_id)
    res.redirect(url)
  });
});

// DELETE by get
app.get('/location/delete/:id', (req, res) => {

  // const { location_id } = req.body;
  let location_id = req.params['id'];

  // SQL query to insert data into the location table
  const sql = 'DELETE FROM location WHERE location_id=? ';
  console.log(sql, location_id)
  // Execute the query with the provided data
  pool.query(sql, [location_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the ID of the inserted row
    // res.json({ 'delete': 'completed' });
    res.redirect('/location/index.html')
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.get('/location/edit/:id', (req, res) => {
//   var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
//   pool.query(sql, (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error retrieving data from the database\n' + sql);
//     } else {
//       res.render('location/insert', { 'location_id': results[0].location_id, location_name: results[0].location_name, 'edit': true })
//     }
//   });
// })

// get data id via /location/edit/:id or /location/:id
// app.get('/location(?:\/edit)?\/:id', async (req, res) => {
//   var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
//   var edit = req.params['edit'] ? true : false
//   pool.query(sql, (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error retrieving data from the database\n' + sql);
//     } else {
//       res.render('location/detail.mustache', { 'location_id': results[0].location_id, location_name: results[0].location_name, 'edit': edit })
//     }
//   });
// });
