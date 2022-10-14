import jwt from 'jsonwebtoken'

// Verify Token


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>
            {if(err) res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You Are Not Authenticated!")
    }
}

export default verifyToken 