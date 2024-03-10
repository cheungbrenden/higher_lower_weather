require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const User = require('./models/user')

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

app.get('/api/users', (request, response) => {
    User.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/users', (request, response) => {

    const body = request.body

    if (body.username === undefined || body.highscore === undefined) {
        return response.status(400).json({ error: 'invalid request' })
    }

    const newUser = new User({
        username: body.username,
        highscore: body.highscore
    })
    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
})


app.get('/api/countryCodeToName', (request, response) => {
    User.find({}).then(notes => {
        response.json(notes)
    })
})



// app.put('/api/users/:id', (request, response) => {

// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})