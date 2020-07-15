
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const {username,password,database} = require('./data');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: username,
    password: password,
    database: database
})

connection.connect();

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    connection.query('SELECT * FROM torrents ORDER BY creationDate DESC', (err,results) =>{
        if(err) throw err;
        res.render('index', {data: results});
    });
    
});

app.post('/request', (req,res) =>{
    connection.query('INSERT INTO torrents (user,name,url) VALUES ?', [[[req.body.name, req.body.title, req.body.url]]], (err,result) => {
        if(err) throw(err);
        res.redirect(req.get('referer'));
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
