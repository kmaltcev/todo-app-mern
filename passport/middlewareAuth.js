const { secretOrKey } = require("../config/keys");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretOrKey);
        const userId = decodedToken.id;
        if (userId)
        {
            User.findOne({_id: userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "User not found"});
                }
                // Check password
                if (userId === user.id) {
                    req.user = user
                    next();
                }
            })
        } else return res.status(400).json({oautherror: "Session expired"});
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};