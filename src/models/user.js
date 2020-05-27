const mongoose = require('mongoose')
const validator = require('validator')
const bycrpt = require('bcryptjs' )
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
  
})

userSchema.methods.generatetoken= async function() {
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'thisistheremix')

    user.tokens= user.tokens.concat({token})
    await user.save()
    return token

}


userSchema.statics.findByCredentials=async (email, password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login. Try agin!");

    }
    const isMatch = await bycrpt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login. Try again!");
    }
    return user;
}


//HASH THE PLAIN TEXT PASS BEFORE SAVING
userSchema.pre('save', async function(next) {  // here we arent using arrow func as we need this and arrow doesnt provide this binding
const user = this;
if (user.isModified('password')){
    user.password= await bycrpt.hash(user.password, 8)
}

next()
        
})

const User = mongoose.model('User', userSchema)

   

module.exports = User