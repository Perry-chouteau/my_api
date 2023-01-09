/* EXPRESS INIT */
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();
const port = 7357;

app.use(cors());
app.use(bodyParser.json());

/* SQL INIT */
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'db_todo',
    user     : 'root',
    password : 'password',
});
connection.connect();

/*app.get('/databases/abc', function (req, res) {
  res.send('Hello from A!');
});*/

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//databases
app.get('/databases', (req, res) => {
  connection.query('SHOW DATABASES;', function(err, rows, fields) {
    if (err)
        throw err;
    res.send(rows);
//        console.log('The solution is: ', rows);
    });
});

app.get('/db1/tables', (req, res) => {
//  req.url = '/db1/tables';
  connection.query('SHOW TABLES;', function(err, rows, fields) {
    if (err)
        throw err;
        res.send(rows);
//        console.log('The solution is: ', rows);
    });
});

app.get('/db1/tables/users', (req, res) => {
  //  req.url = '/db1/tables';
    connection.query('SELECT * FROM users;', function(err, rows, fields) {
      if (!err)
        res.send(rows);
      else
        console.error(err);
    });
  });

app.get('/db1/tables/todos', (req, res) => {
  //  req.url = '/db1/tables';
    connection.query('SELECT * FROM todos;', function(err, rows, fields) {
      if (!err)
        res.send(rows);
      else
        console.error(err);
  //        console.log('The solution is: ', rows);
      });
  });

//______________________________________________________________________________________________________________

// TABLES
// / get
/*app.get('/db_todo/tables', (req, res) => {
  console.log(`get(db_todo/tables)`)
  connection.query(`SHOW TABLES`, function(err, rows, fields) {
    if (!err)
        res.send(rows);
    else
      res.send(`something went wrong !`);
    });
})*/

app.get('/db_todo/table/:table', (req, res) => {
  //get table
  connection.query(`SELECT * FROM ${req.params.table}`, function(err, rows, fields) {
    if (!err)
      res.status(200).send(rows);
    else
      console.error(err);
  });

})
/*
app.get('db_todo/table/:table/get/:id', (req, res) => {
  //res.send(req.params.id)
  console.log(`get(db_todo/table/:table/:id) ${req.params.table} ${req.params.id}`)
  connection.query(`SELECT * FROM ${req.params.table} WHERE Id = ${req.params.id}`, function(err, rows, fields) {
    if (!err)
        res.send(rows);
    else
        res.send(`no result found with table: ${req.params.table} id: ${req.params.id}`);
    });

})*/
// / post

app.post('/db_todo/table/:table/add', (req, res) => {

// add row
  connection.query(`INSERT INTO ${req.params.table} (Title) VALUES ("${req.body.Title}")`, function(err, result) {
    if (!err)
      console.log(`1 record inserted`);
    else
      console.error(`action failed`);
  });
  // get table
  connection.query(`SELECT * FROM ${req.params.table}`, function(err, rows, fields) {
    if (!err)
        res.send(rows);
    else
      console.error(err);
    //        console.log('The solution is: ', rows);
  });
});

//delete

app.delete('/db_todo/table/:table/:id/remove', (req, res) => {
  console.log(`post(db_todo/table/${req.params.table}/${req.params.id}/add)`)
  req.params.table;
  req.params.id;

// add row
  connection.query(`DELETE FROM ${req.params.table} WHERE Id = ${req.params.id}`, function(err, result) {
    if (!err)
      res.send("1 record deleted");
    else
      console.error(err);
  });
});


//table/table_todo/${id}/remove

/*app.post('/data', function(req, res){
  var username=req.body.name;

  connection.query("INSERT INTO `names` (name) VALUES (?)", username.toString(), function(err, result){
      if(err) throw err;
          console.log("1 record inserted");
      });
  res.send(username);
});*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//connection.end();