const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dbFilePath = path.join(__dirname, '../../db/db.json');

// Read notes from db.json and return as JSON
router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while reading the notes.' });
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// Save a new note to db.json and return the new note
router.post('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while reading the notes.' });
        } else {
            const notes = JSON.parse(data);
            const newNote = req.body;
            newNote.id = uuid.v4();
            notes.push(newNote);

            fs.writeFile(dbFilePath, JSON.stringify(notes), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'An error occurred while saving the note.' });
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

// Delete a note by ID
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while reading the notes.' });
        } else {
            const notes = JSON.parse(data);
            const updatedNotes = notes.filter(note => note.id !== noteId);
            console.log(updatedNotes);
            fs.writeFile(dbFilePath, JSON.stringify(updatedNotes), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'An error occurred while deleting the note.' });
                } else {
                    res.json({ message: 'Note deleted successfully.' });
                }
            });
        }
    });
});


module.exports = router;