const router = require('express').Router();
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let currentUser = {}
//Social Auth
const networks = [
    {name: 'google', options: {"scope": ["profile"]}},
    {name: 'facebook', options: {}}
];
networks.forEach(network => {
    router.get(`/${network.name}`, (request, response) => {
        passport.authenticate(network.name, network.options, (req, res) => {
            console.log(req, res)
        })(request, response);
    });

    router.get(`/${network.name}/callback`, (req, res) => {
            passport.authenticate(network.name, {
                failureRedirect: `${keys.FRONTEND_HOST}/login`,
                successRedirect: `/auth/auth-success`
            }, (r) => {console.log(r)} )(req, res)
        }
    )
})

router.get('/auth-success',  (req, res) => {
    currentUser = req.user
    res.redirect(`${keys.FRONTEND_HOST}/dashboard`);
})

//oAuth login
router.get("/user", (req, res) => {
    // Check validation
    if (!currentUser) {
        return res.status(400).json({"user": "No user is authenticated"});
    }
    const id = currentUser._id;
    // Find user by email
    User.findOne({_id: id}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({usernotfound: "User not found"});
        }
        // Check password
        if (id === user.id) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                username: user.username
            };
            // Sign token
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926},
                (err, token) => {
                    res.json({
                        user: user,
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );

        } else return res.status(400)
            .json({oautherror: "Login failed"});
    })
})

module.exports = router;