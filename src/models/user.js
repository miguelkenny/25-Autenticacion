const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

userSchema.methods.encryptedPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)