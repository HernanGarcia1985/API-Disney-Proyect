const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

const authorized = (req,res,next) =>{
    if (req.headers["auth"]){
        let token = req.headers["auth"];

        jwt.verify(token,secretKey,(err)=>{
            if(err){
                return res.json('Token inválido');
            }
            else{
                next();
            }
        })
    }
    else{
        return res.status(403).json({ message: "Acceso denegado, debe loguearse y obtener token de autenticación"})
    }
}

module.exports = authorized;