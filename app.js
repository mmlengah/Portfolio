const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'projects.html'));
});

app.get('/dev-logs', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'devlogs.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));