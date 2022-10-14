// For Use MongoDB
import mongoose from 'mongoose';

// Create a Schema For Categories
const categorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        max: 255,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        max: 255
    }
},{timestamps:true}
);

//Create a Category with categorySchema on MongoDB Atlas
const Category = mongoose.model('Category', categorySchema)

export default Category