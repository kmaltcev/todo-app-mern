const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    provider: {
        type: String
    },
    facebook: {
        type: Object
    },
    google: {
        type: Object
    }
});

module.exports = User = mongoose.model("users", UserSchema);