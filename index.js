const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Respond to GET request on the root route.
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage')
// })

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

// Route that may throw an error
app.get('/error', (req, res) =>{
    throw new Error('Something went wrong')
})

// Route that uses next(error) for asynchronous code 

app.get('/async-error', (req, res, next)=>{

    // Simulating an asynchronous operation that files 

    setTimeout(()=>{
        try{

            // Something that might fail
            const result = nonExistentFunction(); // This will throw an error;
            res. send(result);
        }catch(error){
            next(error)
        }
    }, 5000)
})


// Custom error handling middleware 
// Must have four paramenters to be recognized as an error handler 

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Something broke!')
})


// Serve static files from the 'public' directory

app.use(express.static('public'));

// You can also specify a virtual path prefix

app.use('/static', express.static('public'))

// Using absolute path (recommended)

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.send(`
        <h1>Static Files Example</h1>
        <img src="/images/logo.png" alt="Logo" />
        <link rel="stylesheet" href="/css/style.css" >
        <script src="/js/script.js"></script>
        `
    )
})

app.listen(port, () => {
    console.log(`Example app listening at localhost:${port}`)
});