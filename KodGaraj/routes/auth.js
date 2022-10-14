import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {registerValidation, loginValidation} from '../validation.js'
import User from '../models/User.js'


const router = Router()
//REGISTER
router.post('/register', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE CREATE USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email Already Exists. Login Instead!');

    //Hash The Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create A New User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE LOGIN USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('There is not any account that registered with that email.');
    
    //Checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.');

    //Create and Assing JWT
    const accessToken = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    const {password, ...others} = user._doc;
    res.status(200).json({...others, accessToken})
});


export default router
