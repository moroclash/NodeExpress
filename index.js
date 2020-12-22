const express = require('express')
const app = express()

//enable to pars to jsone by adding json as midel ware so it will add it in pipline 
// of reciving reques so when we deal with request in the end, it will be alredy parsed  
app.use(express.json())



app.get('/user', (req, res) => {
    res.json(" hello, I'm server.")
});

// the url will be e.g  http://localhost:5000/user/512
app.get('/user/:id', (req, res) => {
    res.json(req.params.id)
});

// the url will be e.g  http://localhost:5000/user/qp/5?parameter1=hello&p2=test
// called Query string paramaters
app.get('/user/qp/:id', (req, res) => {
    res.json(req.query)
});



const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`the server listen on port ${port}`)})