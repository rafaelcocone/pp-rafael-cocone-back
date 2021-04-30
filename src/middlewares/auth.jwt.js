//confirmar si el usuario envia token
import jwt, { decode } from 'jsonwebtoken'  
import config from '../config'      
import User from '../models/User'

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")

export const verifyToken = async (req, res, next ) => {
    try{
        const token = req.headers["x-access-token"]

        console.log(token)
    
        if(!token)  return res.status(403).json({message: "No token provided "})
    
        //decodificar token
        const decoded = jwt.verify(token,config.SECRET)
       

        console.log(decoded.id )
        console.log(checkForHexRegExp.test(decoded.id ) )
        console.log(decoded )

        if(!checkForHexRegExp.test(decoded.id ) )  return res.status(403).json({message: "Require ID user valid"})
        req.UserId = decoded.id 

        const user = await User.findById(req.UserId, {password:0})
        console.log(user)
        if(!user) return res.status(404).json({message: 'no user found'})
    
        next()
    }catch(error){
        return res.status(401).json({message: 'Unauthorized'})
    }
}