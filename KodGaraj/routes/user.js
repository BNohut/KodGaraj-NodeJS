import {Router} from 'express'
import bcrypt from 'bcryptjs'
import verifyToken from './verifyToken.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Category_product from '../models/Category_product.js'
import multer from 'multer'
import path from 'path'


const router = Router()

//UPLOAD IMAGE WITH MULTER

let filepath = "";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        if(file.originalname){
            filepath = Date.now() + path.extname(file.originalname);
        }
        cb(null, filepath)
    }
});
const upload = multer({storage: storage});


//CREATE A NEW PRODUCT
router.post('/add_product', upload.single('image'), verifyToken, async (req,res) => {
    // if user upload any image 
    if(filepath === ""){
        filepath = null;
    }else{
        filepath = "/images/" + filepath
    };
    const product = new Product({
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        images: filepath
    });
    const category = req.body.category;
    try{
        const savedProduct = await product.save();
        const categoryObj = await Category.findOne({name: category});
        const category_product = new Category_product({
            productId: savedProduct._id,
            categoryId: categoryObj._id
        });
        const savedCategoryproduct = await category_product.save();
        res.status(201).send('Success! Your product has been created on DB');
    } catch (err) {
        res.status(400).send(err);
    };
});

//CREATE A NEW CATEGORY
router.post('/add_category', verifyToken, async (req, res)=>{
    const category = new Category({
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description
    });
    res.status(201).json(await category.save())});
    

//EDIT USER INFORMATION
router.put("/edit", verifyToken, async (req, res) => {
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    };
});


//GET ALL CATEGORIES WHICH ARE ADDED BY USER
router.get('/categories', verifyToken, async (req, res) =>{
    const userId = req.user._id;
    res.status(200).json(await Category.find({userId: userId})
    );
});

//GET Category By categoryId
router.get('/categories/:id', verifyToken, async (req, res) =>{
    const categoryId = req.params.id;
    res.status(200).json(await Category.find({_id: categoryId}));
});

//PATCH Category By categoryId
router.patch('/categories/:id', verifyToken, async (req, res) =>{
    const categoryId = req.params.id;
    const categoryName = req.body.name;
    const categoryObj = await Category.findOne({name: categoryName});
    if(categoryObj){
        res.status(200).send("Category Name Already Exists.");
    }else{
        try{
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
                $set: req.body
            }, {new:true});
            res.status(200).json(updatedCategory);
        }catch(err){
            res.status(500).json(err);
        };
    };
    
});

// DELETE CATEGORY BY CATEGORYID
router.delete('/categories/:id', verifyToken, async (req, res) =>{
    const categoryId = req.params.id;
    await Category.findByIdAndDelete({_id: categoryId})
    const products = await Category_product.find({categoryId: categoryId});
    for(var i = 0; i < products.length;i++){
        await Product.findByIdAndDelete({_id: products[i].productId});
        await Category_product.findByIdAndDelete({_id: products[i]._id})
    }
    
    res.status(200).send("Success! The Category and All Products that Assign With This Category Has Been Deleted.");
});


//GET ALL PRODUCTS WHICH ARE ADDED BY USER
router.get('/products', verifyToken, async (req, res) =>{
    const userId = req.user._id;
    res.status(200).json(await Product.find({userId: userId}));
});

//GET PRODUCT BY ID
router.get('/products/:id', verifyToken, async (req, res) =>{
    const productId = req.params.id; 
    res.status(200).json(await Product.find({_id: productId}));
});

//PATCH Product By ProductId
router.patch('/products/:id', verifyToken, async (req, res) =>{
    const productId = req.params.id;
    const productName = req.body.name;
    const productObj = await Product.findOne({name: productName});
    if(productObj){
        res.status(200).send("Product Name Already Exists.");
    }else{
        try{
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                $set: req.body
            }, {new:true});
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status(500).json(err);
        };
    };
});


// DELETE PRODUCT BY PRODUCTID
router.delete('/products/:id', verifyToken, async (req, res) =>{
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId)
    const products = await Category_product.find({productId: productId});
    for(var i = 0; i < products.length;i++){
        await Category_product.findByIdAndDelete(products[i]._id)
    }
    res.status(200).send("Success! The Product Has Been Deleted.");
});

export default router