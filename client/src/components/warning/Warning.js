import React, {useContext} from "react";
import {WarningContext} from "../../context/WarningContext";
import {Alert, Button, Container} from "react-bootstrap";

export const Warning = () => {
    const {warn: warning, hide} = useContext(WarningContext)
    const warntitle = warning?.title || "Warning!"
    const warntype = warning?.type || "dark"
    const warntext = warning?.text || "text placeholder"

    return warning.visible ? (
        <Container className="warn-container">
            <Alert variant={warntype} show={warning.visible}>
                <Alert.Heading className="alert-title">
                    {warntitle}
                    <Button className="btn-close" variant={`outline-${warntype}`} onClick={() => hide()}/>
                </Alert.Heading>
                <p>{warntext}</p>
            </Alert>
        </Container>
    ) : null
}