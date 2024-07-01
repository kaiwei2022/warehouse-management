// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./db');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Warehouse Management API',
            version: '1.0.0',
        },
    },
    apis: ['./src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /projects:
 *   post:
 *     description: Create a new project
 *     parameters:
 *       - name: name
 *         description: Project name
 *         required: true
 *         type: string
 *       - name: start_date
 *         description: Start date
 *         required: true
 *         type: string
 *       - name: end_date
 *         description: End date
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
app.post('/projects', (req, res) => {
    const { name, start_date, end_date } = req.body;
    if (!name || !start_date || !end_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO projects (name, start_date, end_date) VALUES (?, ?, ?)';
    db.query(sql, [name, start_date, end_date], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).send('Project added');
    });
});

/**
 * @swagger
 * /projects:
 *   get:
 *     description: Get all projects
 *     responses:
 *       200:
 *         description: Successful
 */
app.get('/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
});

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     description: Get a single project
 *     parameters:
 *       - name: id
 *         description: Project ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not Found
 */
app.get('/projects/:id', (req, res) => {
    const sql = 'SELECT * FROM projects WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length === 0) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(result);
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: name
 *         description: User name
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).send('User added');
    });
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Successful
 */
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get a single user
 *     parameters:
 *       - name: id
 *         description: User ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not Found
 */
app.get('/users/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(result);
    });
});

/**
 * @swagger
 * /items:
 *   post:
 *     description: Create a new item
 *     parameters:
 *       - name: name
 *         description: Item name
 *         required: true
 *         type: string
 *       - name: manufacturer
 *         description: Manufacturer
 *         required: true
 *         type: string
 *       - name: identifier
 *         description: Identifier (e.g., serial number)
 *         required: true
 *         type: string
 *       - name: responsible_person
 *         description: Person responsible for the item
 *         required: true
 *         type: string
 *       - name: project_id
 *         description: Project ID
 *         required: true
 *         type: integer
 *       - name: order_date
 *         description: Order date
 *         required: true
 *         type: string
 *       - name: last_storage_date
 *         description: Last storage date
 *         required: true
 *         type: string
 *       - name: current_user_id
 *         description: Current user ID
 *         required: true
 *         type: integer
 *       - name: guarantee
 *         description: Guarantee
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
app.post('/items', (req, res) => {
    const { name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee } = req.body;
    if (!name || !manufacturer || !identifier || !responsible_person || !project_id || !order_date || !last_storage_date || !current_user_id || !guarantee) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO items (name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, manufacturer, identifier, responsible_person, project_id, order_date, last_storage_date, current_user_id, guarantee], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).send('Item added');
    });
});

/**
 * @swagger
 * /items:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: Successful
 */
app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     description: Get a single item
 *     parameters:
 *       - name: id
 *         description: Item ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not Found
 */
app.get('/items/:id', (req, res) => {
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
