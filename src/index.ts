import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/kudo');
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.log(err);
    }

    app.listen(3001, () => {
        console.log('Listening on port 3001!');
    });
};

start();