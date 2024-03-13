require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

const User = require('./models/user')

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

app.get('/api/users/:id', (request, response) => {
    const id = request.params.id
    User.findOne({ id }).then(user => {
        response.json(user)
    })
})

app.post('/api/users', (request, response) => {

    const body = request.body
    console.log(body)
    if (body.username === undefined) {
        return response.status(400).json({ error: 'invalid request' })
    }

    const newUser = new User({
        id: body.id,
        username: body.username,
        picture: body.picture,
        email: body.email,
        highscore: 0
    })
    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
})

app.put('/api/users/:id', (request, response) => {

    const body = request.body

    const updatedUser = {
        id: body.id,
        username: body.username,
        picture: body.picture,
        email: body.email,
        highscore: body.highscore
    }

    User.findOneAndUpdate({ id: body.id }, updatedUser, { new: true }).then(user => {
        response.json(user)
    })

})


// app.get('/api/countryCodeToName', (request, response) => {
//     User.find({}).then(notes => {
//         response.json(notes)
//     })
// })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})