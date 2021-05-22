const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        const uri = `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.MONGO_CNN}:${process.env.PORTDB}/${process.env.DB}`


       await mongoose.connect( uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        authSource:"admin"
       });

       console.log('Base datos online conectada')
        
    } catch (error) {

        throw new Error('Error en la base datos')

    }

}


module.exports = {
    dbConnection,
}