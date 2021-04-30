import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/users.controller'
import {authJwt, vefifySingup} from '../middlewares'


//obtener todos los usuarios
router.post('/', [
        authJwt.verifyToken
    ], userCtrl.getUsers
)


//crear usuario
router.post('/createUser/', [
        authJwt.verifyToken
    ], userCtrl.createUser
)

//borrar usuario
router.delete('/:userId', [
        authJwt.verifyToken
    ], userCtrl.deleteUserById
)

//agruapr
router.get('/group/',[ 
        authJwt.verifyToken
    ], userCtrl.groupByUser
)

export default router