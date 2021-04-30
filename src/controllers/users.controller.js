import User from '../models/User'

//crear nuevo usuario
export const createUser = async(req,res) => {
    console.log(req.body)
    const { name, email, telephone, password, age, gender, hobby} = req.body

    const newUser = new User({ name, email, telephone, password, age, gender, hobby})

    const userSaved = await newUser.save()

    res.status(200).json(userSaved)
}

//consultar todos los ussario
// busqueda por nombre y/o poasatiempo
export const getUsers = async(req,res) => {

    console.log(req.body)
    let users = [],
        search = {},
        status = 200
    const {name, hobby} = req.body;

    if(name && name !== '') search.name = name
    if(hobby && hobby !== '')   search.hobby = hobby

    console.log(search)

    users = await User.find(search)

    res.status(status).json(users)   
}

//borar un usuario pr id
export const deleteUserById = async(req,res) => {
    const {userId} = req.params
    
    await User.findByIdAndDelete( userId )
    return res.status(200).json({message:"User was delete."})
}

export const groupByUser = async(req,res) => {
    res.json('search user')
}