const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const adminsSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: "admin",
    }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminsSchema);