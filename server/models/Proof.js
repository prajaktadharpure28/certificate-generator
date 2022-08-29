const mongoose = require('mongoose')

const proofSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: { type: String, required: true},
    date: { type: Date, default: Date.now},
    technology: { type: String, required: [true]}, 
    visibility: { type: String, select: false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},
)

module.exports = mongoose.model('Proof', proofSchema)
