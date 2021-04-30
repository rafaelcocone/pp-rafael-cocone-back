import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'

var validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

//validacion de datos recibidos para crear un nuevo usuario
var validateData = (data) => {
    let message = '';
    try{ 
        const { name, email, telephone, password, age, gender, hobby} = data
         //datos obligatorios
        if(!name || name === '') throw "Require name."
        if(!email || email === '') throw "Require email."
        if(!password || password === '') throw "Require password."
        if(!telephone || telephone === '') throw "Require telephone number."
        if(!age || age === '') throw "Require age."
        if(!gender || gender === '') throw "Require gender."
        if(!hobby || hobby === '')   throw "Require hobby."

        //validacion de datos
        if(!validateEmail(email)) throw "You need add a email vaild format"
        if(password.length < 8 ) throw "password must be 8 characters minimum" 
        if(!Number.isInteger( Number.parseInt(age, 10) ) ) throw "age must be numeric" 
        if(age <= 0)  throw "age must be a positive number" 
        if(gender !== 'M' && gender !== 'F')  throw "You need select a gender (M or F)" 
        if( telephone.match(/\d/g).length !==10 ) throw "not valid format telephone number (10 numbers)." 
        
    }catch(error){
        message= error;
    }
    return message 
}


export const signup = async (req,res) => {
    console.log(req.body)
  
    let message = validateData (req.body)
    if( message !== '') return res.status(403).json({message})
    
    const { name, email, telephone, password, age, gender, hobby} = req.body

    const newUser = new User({ 
        name, 
        email, 
        telephone, 
        password:await User.encryptPassword(password), 
        age, 
        gender, 
        hobby})

    const userSaved = await newUser.save()

    //generacionde token
    const token = jwt.sign({id: userSaved._id}, config.SECRET, {
        expiresIn:864000//24 horas
    })

    res.status(200).json({token})
}

export const signin = async (req,res) => {
    res.json('signin')
}