import mongoose from 'mongoose';

let isConected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConected) {
        console.log('MongoDB is olredy connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}