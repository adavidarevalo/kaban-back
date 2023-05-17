const mongoose = require('mongoose')

mongoose
    .connect(`${process.env.MONGO_CONNECTION_URL}${process.env.MONGO_DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Mongodb conencted ' + process.env.MONGO_DB_NAME))
    .catch((err: Error) => console.log(err))
