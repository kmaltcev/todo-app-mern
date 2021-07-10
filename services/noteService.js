const Note = require("../models/Notes");

const addNote = async (note) => {
    try {
        const myNote = new Note(note);
        await myNote.save();
        return myNote
    } catch (err) {
        console.log(err)
    }
}

const deleteNote = async (id) => {
    try {
        return await Note.findById(id).deleteOne()
    } catch (err) {
        console.log(err)
    }
}

const getNotes = async (id) => {
    try {
        return Note.find({postedBy: id})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addNote,
    deleteNote,
    getNotes
}