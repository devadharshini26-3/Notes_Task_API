const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must contain at least 3 characters']
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [5, 'Description must contain at least 5 characters']
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;