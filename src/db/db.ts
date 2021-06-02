import mongoose from 'mongoose';

const mongoOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
};

export let mongodb: mongoose.Connection = null

export const initDB = (): void => {
    mongodb = mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`, mongoOptions)
    mongodb.on('open', () => {
        console.log(`Mongoose connection open to ${process.env.DB_ADDRESS}/${process.env.DB_NAME}`);
    });
    mongodb.on('error', (err) => {
        console.log(`Mongoose connection error: ${err} with connection info ${JSON.stringify(process.env.DB_ADDRESS)}`);
        process.exit(0);
    });
}


