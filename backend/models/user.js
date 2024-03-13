const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    picture: String,
    email: String,
    highscore: Number,

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('User', userSchema)