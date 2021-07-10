const express = require("express");
const router = express.Router();

const {addNote, deleteNote, getNotes} = require('../../services/noteService')

router.post("/addnote", async (req, res) => {
        try {
            await addNote({...req.body, postedBy: req.user._id}).then(r => {
                console.log(r)
                res.send(r)
            });

        } catch (err) {
            res.sendStatus(400)
        }
    }
)

router.post("/removenote", async (req, res) => {
        try {
            const {id} = req.body;
            await deleteNote(id);
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400)
        }
    }
)

router.get("/getnotes", async (req, res) => {
        try {
            const {id} = req.user;
            const notes = await getNotes(id);
            res.send(notes);
        } catch (err) {
            res.sendStatus(400)
        }
    }
)

module.exports = router