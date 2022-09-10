const mongoose = require("mongoose");

const Login = mongoose.model("Login" , {
    login:{
        type : String
    },
    password: {
        type: String
    }
});

module.exports = Login;