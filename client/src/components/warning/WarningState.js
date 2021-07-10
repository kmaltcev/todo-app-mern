import React, {useReducer} from "react";
import {WarningContext} from "../../context/WarningContext";
import {errorReducer} from "../../reducers/errorReducer";
import {HIDE_WARNING, SHOW_WARNING} from "../../actions/types";
import {Warning} from "./Warning";

export const WarningState = ({children}) => {
    const [state, dispatch] = useReducer(errorReducer, {visible: false}, undefined)

    const show = (title, text, type = 'warning') => {
        if (text) {
            dispatch({
                type: SHOW_WARNING,
                payload: {title, text, type}
            })
        }
    }

    const hide = () => {
        dispatch({
            type: HIDE_WARNING,
            payload: {}
        })
    }
    return (
        <WarningContext.Provider value={{
            show, hide,
            warn: state
        }}>
            {children}
            <Warning/>
        </WarningContext.Provider>
    )
}