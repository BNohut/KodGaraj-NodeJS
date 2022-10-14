// For Use MongoDB
import mongoose from 'mongoose';

// Create a Schema For Users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        requeired: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
},{timestamps: true}
);

//Create a User with userSchima on MongoDB Atlas
const User = mongoose.model('User', userSchema)

export default User