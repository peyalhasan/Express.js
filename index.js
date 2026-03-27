const express = require('express');
const app = express();
const port = 3000;


// Respond to GET request on the root route.
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

// Respond to POST request on the root route 
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

app.get('/:userId/books/:bookId', (req, res) => {
    res.send(`User ID: ${req.params.userId}, BookID: ${req.params.bookId}`)
});

app.get('/search', (req, res) =>{
    // Access query parameters using req.query

    const {q, category} = req.query;
    res.send(`Search query: ${q}, Categroy: ${category || 'none'}`)
})


// Middleware to parse JSON request bodies

app.use(express.json());

// Middleware to parse URL - encoded request bodies

app.use(express.urlencoded({extended: true}))

// Middleware to serve static files from a directory

app.use(express.static('public'))

app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.status(201).json({message: "User created", user: req.body})
})


app.listen(port, () => {
    console.log(`Example app listening at localhost:${port}`)
});