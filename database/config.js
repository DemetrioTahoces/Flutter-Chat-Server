const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('DB Online');

    } catch (e) {
        console.log(e);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    dbConnection
}