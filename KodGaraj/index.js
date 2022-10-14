//ES6
// For run a server
import express from 'express'
// For secret variables
import dotenv from 'dotenv'
// For Use MongoDB
import mongoose from 'mongoose'
//This project uses 'localhost' for server. CORS will let us do requests.
import cors from 'cors'

//Import Routes From JS files
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import userRoute from './routes/user.js'
import router from './routes/user.js'
//Creat App by using Express
const app = express();

//Env
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(console.log('Connected to DB!')).catch((err) => console.log(err))


//Middleware
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);





// Listen Me On localhost:PORT
app.listen(process.env.PORT, () => console.log('Server Up and Running'));
