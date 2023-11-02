const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please enter your question'],
    }, answer: {
        type: Object,
        required: [true, 'Please enter your answer'],
    }, user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please enter your user'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);