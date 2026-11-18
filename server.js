const dns = require('dns');
dns.setServers(['8.8.8.8']);


const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error);
    });

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Notes Task API');
});
app.post('/notes', async (req, res, next) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            description: req.body.description
        });

        const savedNote = await newNote.save();

        res.status(201).json(savedNote);

    } catch (error) {
        next(error);
    }
    
});
// Get all notes with filtering and searching
app.get('/notes', async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.title) {
            filter.title = req.query.title;
        }

        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        let query = Note.find(filter);
        if (req.query.sort === 'newest') {
            query = query.sort({ _id: -1 });
        } else if (req.query.sort === 'oldest') {
            query = query.sort({ _id: 1 });
        }

        if (req.query.limit) {
            query = query.limit(Number(req.query.limit));
        }

        const notes = await query;


        res.status(200).json(notes);

    } catch (error) {
        next(error);
    }
});
// Get a single note by ID
app.get('/notes/:id', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json(note);

    } catch (error) {
        next(error);
    }
});
// Update a note
app.put('/notes/:id', async (req, res, next) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description
            },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
});
// Delete a note
app.delete('/notes/:id', async (req, res, next) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note deleted successfully'
        });

    } catch (error) {
        next(error);
    }
});
// Centralized Error Handling Middleware
app.use((err, req, res, next) => {

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    res.status(500).json({
        message: 'Internal Server Error'
    });

});
// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});