import User from '../models/User'

var today = new Date();
var treeDaysBefore = new Date();

treeDaysBefore.setDate(today.getDate() - 3);/*
var dd = String(treeDaysBefore.getDate()).padStart(2, '0');
var mm = String(treeDaysBefore.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = treeDaysBefore.getFullYear();

treeDaysBefore = yyyy+'-'+mm+'-'+dd*/


//crear nuevo usuario
export const createUser = async(req,res) => {
    const { name, email, telephone, password, age, gender, hobby,signupDate} = req.body

    const newUser = new User({ name, email, telephone, password, age, gender, hobby, signupDate})

    const userSaved = await newUser.save()

    res.status(200).json(userSaved)
}

//consultar todos los ussario
// busqueda por nombre y/o poasatiempo
export const getUsers = async(req,res) => {

    let users = [],
        search = {},
        status = 200
    const {name, hobby} = req.body;

    if(name && name !== '') search.name = name
    if(hobby && hobby !== '')   search.hobby = hobby


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
    let users = [],
    search = {},
    status = 200

    users = await User.aggregate([
        {
            $match:{
                age:{$gt:18}, 
                gender:"F",
                signupDate:{ $gte:treeDaysBefore}
            }
                
        },{
            $group:{
                _id: { Hobby:"$hobby"  },
                users: { 
                    $push:{
                        name:"$name",
                        telephone:"$telephone",
                        hobby:"$hobby"

                    }
                 }
            }
        }
    ])

    res.status(status).json(users)   
}