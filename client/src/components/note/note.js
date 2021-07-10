import {Button, Card} from "react-bootstrap";
import React, {useContext} from "react";
import {NotesContext} from "../../context/NotesContext";
import {WarningContext} from "../../context/WarningContext";
import "./note.css"

export const Note = ({note}) => {
    const {show} = useContext(WarningContext)
    const {removeNote} = useContext(NotesContext)

    const onClick = event => {
        event.preventDefault()
        removeNote(note._id)
        show(JSON.stringify(note))
    }

    const fontcolor = "#" + ("0xFFFFFF" - note.color.replace("#", "0x")).toString(16)
    return (
        <Card className="note-item" style={{"background": note.color, "color": fontcolor}} >
            <Card.Body>
                <Card.Title className="note">
                    {note.title}
                    <Button className="btn-close" variant="outline-danger" onClick={onClick}/>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {new Date(note.date).toLocaleDateString()}
                </Card.Subtitle>
                {note.text.split("\n").map((line, idx) =>
                    <Card.Text className="mb-0" key={idx}>
                        {line}
                    </Card.Text>)}
            </Card.Body>
        </Card>
    )
}