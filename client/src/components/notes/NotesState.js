import React, {useContext, useReducer} from 'react'
import axios from 'axios'
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from '../../actions/types'
import {notesReducer} from "../../reducers/notesReducer";
import {NotesContext} from "../../context/NotesContext";
import {WarningContext} from "../../context/WarningContext";
import {useSelector} from "react-redux";

export const NotesState = ({children}) => {
    const {show} = useContext(WarningContext)
    const {user} = useSelector(state => state.auth)
    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(notesReducer, initialState, undefined)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        try {
            showLoader()
            const res = await axios.get("/api/notes/getnotes")
            const payload = res.data
            if (payload.length > 0) {
                show("Success!", `${payload.length} Tasks loaded, have a good day`, "success")
            }
            else {
                show(`Hey there, ${user.username.split(" ")[0]}`, `You still doesn't have a note? Add one to become more productive 👏`, "info")
            }
            dispatch({type: FETCH_NOTES, payload})
        }
        catch (e) {
            show(`${e.name}!`, `${e.message}`, e.name === "Error" ? "danger" : "warning")
        }
    }

    const addNote = async (note) => {
        try {
            const res = await axios.post("/api/notes/addnote", note)
            const payload = res.data
            dispatch({type: ADD_NOTE, payload})
        }
        catch (e) {
            show(`${e.name}!`, `${e.message}`, e.name === "Error" ? "danger" : "warning")
        }
    }

    const removeNote = async id => {
        try {
            await axios.post("/api/notes/removenote", {id})
            dispatch({
                type: REMOVE_NOTE,
                payload: id
            })
        }
        catch (e) {
            show(`${e.name}!`, `${e.message}`, e.name === "Error" ? "danger" : "warning")
        }
    }

    return (
        <NotesContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </NotesContext.Provider>
    )
}