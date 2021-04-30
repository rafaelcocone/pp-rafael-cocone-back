import app from './app'
import './database'

const puerto = 4000

app.listen(puerto)
console.log('Server listen on port',puerto)