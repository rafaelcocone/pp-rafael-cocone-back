import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'



//creacion de nuevo usario y retorna un token
export const signup = async (req,res) => {
    console.log(req.body)
      
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


//ingreso de email y password, retorna un token
export const signin = async (req,res) => {
    
    const userFound = await User.findOne({email: req.body.email})
    if(!userFound) return res.status(400).json({message:"User not found"})

    const matchPassword = await User.comparePasword(req.body.password, userFound.password)
    if(!matchPassword) return res.status(401).json({token:null, message:"Invalid password"})
    console.log(userFound)

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn:864000//24 horas
    })

    res.json({token})
}