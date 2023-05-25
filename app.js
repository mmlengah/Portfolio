const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));