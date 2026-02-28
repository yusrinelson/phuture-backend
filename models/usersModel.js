const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const validator = require("validator");

// User Schema for basic login/registration
const userSchema = new mongoose.Schema({
    name: {
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
        enum: ["user", "admin"],
        default: "user",
    },
    refreshToken: {
        type: String,
        // default: "",
    }
}, {timestamps: true});

//Hash password before saving
userSchema.pre("save", async function (next){
    if (!validator.isEmail(this.email)) {
        throw new Error("Invalid email address");
    }
    if (!validator.isStrongPassword(this.password)) {
        throw new Error("Password is not strong enough");
    }

    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bycrypt.genSalt(10);
    const hash = await bycrypt.hash(this.password, salt);
    this.password = hash

    next()
})


//Match passwords
userSchema.methods.matchPassword = async function(password){
    return await bycrypt.compare(password, this.password);
}
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return enteredPassword === this.password;
// }; only if you not hashing password

module.exports = mongoose.model("User", userSchema);