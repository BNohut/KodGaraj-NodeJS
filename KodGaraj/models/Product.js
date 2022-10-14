// For Use MongoDB
import mongoose from 'mongoose';

// Create a Schema For Products
    // *userid should be foreing key for user
    // 'name' for product name,
    // 'description' for product description,
    // 'price' for product price
    // 'stock' for quantity of products in store
    // 'images' for product images
    // 'created_date' and 'updated_date' fields will filled automaticaly by 'timestamps'

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        requeired: true,
        max: 255,
        min: 6
    },
    price: {
        type: Number,
        required: true,
        max: 1024,
        min: 6
    },
    stock: {
        type: Number,
        required: true,
    },
    images:{
        type: String,
        required: false,
    }

},{timestamps:true}
);

//Create a Product with productSchima on MongoDB Atlas
const Product = mongoose.model('Product', productSchema)

export default Product