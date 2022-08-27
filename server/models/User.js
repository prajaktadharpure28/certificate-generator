const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: [true, 'Please enter your full name']
    },
    email: {
        type: String, required: [true, 'Please enter your email']
    },   
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)