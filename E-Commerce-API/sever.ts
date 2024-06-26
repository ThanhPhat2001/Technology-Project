import dotenv from 'dotenv';
import appConfigs from './src/constants/configs';
import app from './src/app';
import mongoose from 'mongoose';

dotenv.config();
//Khai báo port cho server
const PORT = appConfigs.PORT;

const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};

mongoose
    .connect('mongodb://localhost:27017/Technology-Project', mongooseDbOptions)
    .then(() => {
       console.log('⚡️[MongoDB]: Connected successfully');
      //should listen app here
      //Khởi tạo server ở PORT đã chỉ định ở trên
        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
      console.error('Failed to Connect to MongoDB', err);
    });
