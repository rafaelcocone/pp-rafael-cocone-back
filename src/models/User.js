import {Schema, model} from 'mongoose'
import bcrypt, { compare } from 'bcryptjs'

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = new Schema({
    name: {
        type: String,
        require: 'you need add a name',
        trim: true
    },
    email:{
        type: String,
        require: 'You need add a email.',
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Fou need add a email vaild format'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'You need add a email vaild format']

    },
    telephone:{
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{2}-\d{2}/.test(v);
            },
            message: props => `${props.value} not valid format telephone number.`
        },
        require: 'You need add telephone number.'
    },
    password:{
        type: String,
        minlength: 8,
        trim: true,
        require: 'You need a password.'
    }, 
    age:{
        type: Number,
        require: 'You need add age',
        min:[1,'age must be positive number.']
    },
    gender:{
        type: String,
        trim: true,
        require: 'You need select a gender (M or F)',
        enum: ['F', 'M'],
    },
    hobby: {
        type: String,
        trim: true,
        require: 'You need add a hobby'
    },
    signupDate: {
        type: Date,
        default: Date.now()

    }    
},{
    timestamps:true,
    versionKey:false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

userSchema.statics.comparePasword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}
 



module.exports = model('User', userSchema)