import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/projectBackend-App',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:true,
    useCreateIndex:true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err) )
