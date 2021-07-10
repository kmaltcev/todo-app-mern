import "./notes.css"
import {NoteItem} from "./NoteItem";
import {CardForm} from "../CardForm";
import {Check} from "@material-ui/icons";
import {NotesContext} from "../../context/NotesContext";
import React, {useContext, useEffect, useState} from "react"
import {Button, Card, Form, ListGroup} from "react-bootstrap";


export const NotesList = () => {
    const [note, setNote] = useState({color: "#ffffff"})
    const {notes, fetchNotes, addNote} = useContext(NotesContext)

    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    const submitHandler = event => {
        event.preventDefault()
        addNote(note)
    }

    const onChange = ({target}) => {
        setNote({...note, [target.id]: target.value})
    }

    return (
        <ListGroup className="note-list">
            {notes.map((note, idx) =>
                <NoteItem key={idx} note={note}/>
            )}
            <Form onSubmit={submitHandler}>
                <Card className="note-item" style={{"background": note.color}}>
                    <Card.Body>
                        <CardForm options={{
                            as: "input", size: "sm", type: "text", onChange: onChange, required: true,
                            placeholder: "Title", className: "border-0 border-bottom", id: "title"
                        }}/>
                        <CardForm options={{
                            as: "input", size: "sm", type: "date", onChange: onChange,
                            placeholder: "Date", className: "border-0 border-bottom", id: "date"
                        }}/>
                        <CardForm options={{
                            as: "textarea", size: "sm", type: "text", onChange: onChange,
                            placeholder: "Text", className: "border-0 border-bottom", id: "text"
                        }}/>
                        <CardForm options={{
                            type: "color", id: "color", defaultValue: note.color,
                            title: "Choose your color", size: "sm", className: "border-1", onChange: onChange,
                        }}/>
                        <Button className="btn-success" type="submit" style={{float: "right", padding: "1px 2px"}}>
                            <Check/>
                        </Button>
                    </Card.Body>
                </Card>
            </Form>
        </ListGroup>
    )
}