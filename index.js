const Joi = require('joi')
const express = require('express')
const app = express()


//enable to pars to jsone by adding json as midel ware so it will add it in pipline 
// of reciving reques so when we deal with request in the end, it will be alredy parsed  
app.use(express.json())


var users = [
    { id: 1, name: "user1"},
    { id: 2, name: "user2"},
    { id: 3, name: "user3"},
]


app.get('/user', (req, res) => {
    res.json(" hello, I'm server.")
});

// the url will be e.g  http://localhost:5000/user/512
app.get('/user/:id', (req, res) => {
    let user = users.find( u => u.id == req.params.id)
    if(!user) return res.status(400).send('user not found')
    res.send(user) 
});

// the url will be e.g  http://localhost:5000/user/qp/5?parameter1=hello&p2=test
// called Query string paramaters
app.get('/user/qp/:id', (req, res) => {
    res.json(req.query)
});


app.get('/users/:id', (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })

    let result = schema.validate(req.query)
    if(result.error) return res.status(400).send(result.error.details[0].message)


    let newUser = {
        id: user.length +1,
        name: req.query.name
    }
    users.push(newUser)
    res.json(newUser)
});


const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`the server listen on port ${port}`)})