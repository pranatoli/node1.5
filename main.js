require('dotenv').config()

let express = require('express')
let app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')

class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

const users = [
    { id: 0, username: "Example", email: "mail@example.com", password: "password" },
    { id: 1, username: "Pasha", email: "mail@example.com", password: "25" },
    { id: 2, username: "Ivan", email: "mail@example.com", password: "17" },
];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/users', function (req, res) {
    res.send(users)
})

app.get('/users/:id', function (req, res) {
    const idUser = users.findIndex((i) => i.id == req.params.id)
    if (idUser != -1) {
        const curentUser = users[idUser]
        res.send(curentUser)
    }
    else {
        res.send('user not found')
    }
})

app.put('/users/:id', function (req, res) {
    const id = users.findIndex((i) => i.id == req.params.id)
    if (id != -1) {
        const body = req.body
        update = new User(req.params.id, body.username, body.email, body.password)
        const updateUser = users.map((i) => (i.id == req.params.id ? update : i))
        res.send(users[req.params.id])
    }
    else {
        const body = req.body
        users[req.params.id] = new User(+req.params.id, body.username, body.email, body.password)
        res.send(users[req.params.id])
    }
})

app.patch('/users/:id', function (req, res) {

    const id = users.findIndex((i) => i.id == req.params.id)
    if (id != -1) {
        const body = req.body
        const updateUser = users.map((i) => (i.id == req.params.id ? i.password = body.password : i))
        res.send(users[req.params.id])
    }
    else {
        res.send('user not found')
    }
})

app.delete('/users/:id', function (req, res) {
    if (users[req.params.id].hasOwnProperty('id')) {
        const id = users.findIndex((i) => i.id == req.params.id)
        if (id != -1) {
            const updateUser = users.map((i) => (i.id == req.params.id ? i = {} : i))
            users.splice(0, users.length, ...updateUser)
            res.send('user is deleted')

        }
    } else res.send('user not found')


})

app.listen(port, () => console.log(`server started on port ${port}`))
