import mongoose from 'mongoose'


// Create Matched Schema Between Categories & Products
const category_productSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
},{timestamps:true}
);

//Create a Product with productSchima on MongoDB Atlas
const category_product = mongoose.model('category_product', category_productSchema)

export default category_product