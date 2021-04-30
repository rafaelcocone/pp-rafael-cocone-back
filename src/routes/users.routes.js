import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/users.controller'

//obtener todos los usuarios
router.get('/', userCtrl.getUsers)

router.post('/', userCtrl.getUsers)

//crear usuario
router.post('/createUser/', userCtrl.createUser)

//borrar usuario
router.delete('/:userId', userCtrl.deleteUserById)

//agruapr
router.get('/group/', userCtrl.groupByUser)

export default router