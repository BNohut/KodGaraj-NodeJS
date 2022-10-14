import Router from 'express'
import Product from '../models/Product.js'
import jwtToken from './verifyToken.js'
import User from '../models/User.js'

const router = Router()




router.get('/', jwtToken, (req, res) => {
    res.json({
        posts: {
            title: "my first post",
            description: "random data you shouldnt access"
        }
    });
});

export default router