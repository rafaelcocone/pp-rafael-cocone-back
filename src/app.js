import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

//inicalizaciones
const app = express()

import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'

app.set('pkg',pkg)

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.json({
        "author": app.get('pkg').author,
        "email": app.get('pkg').email,
        "telephone": app.get('pkg').telephone,
        "description": app.get('pkg').description

    })
})

//routes
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)


export default app