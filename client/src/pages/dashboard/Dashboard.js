import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";
import {NotesList} from "../../components/notes/NotesList";
import "./dashboard.css"
import {WarningState} from "../../components/warning/WarningState";
import {NotesState} from "../../components/notes/NotesState";

const Dashboard = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)

    if (!auth.isAuthenticated) {
        history.push("/");
    }

    return (
        <WarningState>
            <Container fluid className="notes-container align-items-center">
                <NotesState>
                    <NotesList/>
                </NotesState>
            </Container>
        </WarningState>
    );
}
export default Dashboard;