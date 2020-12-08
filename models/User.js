const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    room : {
        type : [String]
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User