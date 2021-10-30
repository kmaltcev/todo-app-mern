const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    text: {
        type: String
    },
    color: {
        type: String
    }
});

module.exports = SNote = mongoose.model("notes", NotesSchema);
