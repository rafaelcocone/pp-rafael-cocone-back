import User from '../models/User'

var validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}


export const validateData = async  (req,res,next) =>{
 
    let message = '';
    try{ 
        const { name, email, telephone, password, age, gender, hobby} = req.body
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

        //busqueda de email repetido
        const emailFound = await User.findOne( {email: req.body.email} )
        if(emailFound) throw "the email already exist"
        
    }catch(error){
        console.log(error)
        return res.status(400).json({message: error})
    }
    
    next()
}