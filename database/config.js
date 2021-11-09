const mongoose = require('mongoose')

const dbConecction = async() =>{
    try {
      await  mongoose.connect( process.env.MONGODB_CNN
    //     ,{
    //       useNewUrlParset: true,
    //       useUnifiedTopology:true,
    //       useCreateIndex:true,
    //       useFindAndModify:false
    //   }
      );

      console.log('Conexión a DB establecida')
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar proceso')
    }
}

module.exports = {
    dbConecction
}