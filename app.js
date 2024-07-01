// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Parse JSON bodies

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'changkaiwei',
    password: '1234567890',
    database: 'warehouse_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API Endpoints

// Create a project
app.post('/projects', (req, res) => {
    const { name, start_date, end_date } = req.body;
    const sql = 'INSERT INTO projects (name, start_date, end_date) VALUES (?, ?, ?)';
    db.query(sql, [name, start_date, end_date], (err, result) => {
        if (err) throw err;
        res.status(201).send('Project added');
    });
});

// Get all projects
app.get('/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Get a single project
app.get('/projects/:id', (req, res) => {
    const sql = 'SELECT * FROM projects WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Create a user
app.post('/users', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.status(201).send('User added');
    });
});

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Get a single user
app.get('/users/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Create an item
app.post('/items', (req, res) => {
    const { name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee } = req.body;
    const sql = 'INSERT INTO items (name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee], (err, result) => {
        if (err) throw err;
        res.status(201).send('Item added');
    });
});

// Get all items
app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Get a single item
app.get('/items/:id', (req, res) => {
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Update an item
app.put('/items/:id', (req, res) => {
    const { name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee } = req.body;
    const sql = 'UPDATE items SET name = ?, manufacturer = ?, identifier = ?, responsible_person = ?, project_id = ?, order_date = ?, last_storage_date = ?, current_user_id = ?, guarantee = ? WHERE id = ?';
    db.query(sql, [name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee, req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Item updated');
    });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Item deleted');
    });
});

// Track item usage
app.post('/item-usage', (req, res) => {
    const { item_id, user_id, start_date, end_date } = req.body;
    const sql = 'INSERT INTO item_usage (item_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [item_id, user_id, start_date, end_date], (err, result) => {
        if (err) throw err;
        res.status(201).send('Item usage recorded');
    });
});

// Get usage history for an item
app.get('/item-usage/:item_id', (req, res) => {
    const sql = 'SELECT * FROM item_usage WHERE item_id = ?';
    db.query(sql, [req.params.item_id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
