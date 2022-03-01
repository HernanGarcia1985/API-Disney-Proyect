const db = require('../database/models');
const Usuario = require('../database/models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

const userController = {
    login: (req, res) => {

        let resultado = {
			link: "http://localhost:3000/auth/login",
			cantidad: 0,
			data: [],
            token: []
		}

        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((usuarioLogin) =>{
                if(usuarioLogin) {
                    let validarPassword = bcryptjs.compareSync(req.body.password, usuarioLogin.password);
                    if (validarPassword == true) { 
                        const token = jwt.sign(
                            {
                            exp: Math.floor(Date.now() / 1000) + 1200, //20 min
                            data: usuarioLogin,
                            },
                            secretKey
                            );

                        resultado.data.push("Bienvenido, " + req.body.email);
                        resultado.cantidad = 1;
                        resultado.token.push(token);
                        return res.json(resultado);
                    } 
                    else{
                        resultado.data.push('Las credenciales son inválidas');
                        return res.json(resultado);   
                    }
                }
                else{
                    resultado.data.push('No se encuentra este email en nuestra base de datos');
                    return res.json(resultado);
                } 
            })
            .catch(function(error){
                console.log("No se encuentra este email en nuestra base de datos");
            })
    },

    register: (req, res) => {

        let resultado = {
			link: "http://localhost:3000/auth/register",
			cantidad: 0,
			data: [],
		}

        db.Usuario.findOne({
			where: {
				email: req.body.email
			}
		})
			.then((usuarioEnBD) =>{
				if (usuarioEnBD) {
                    resultado.data.push('Este email ya está registrado en nuestra base de datos');
                    return res.json(resultado);
				}
                else{
                    db.Usuario.create({
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                    });
                    resultado.data.push('Su email fue registrado en nuestra base de datos');
                    resultado.cantidad = 1;
                    return res.json(resultado);
                }
			})
			.catch(function(error){
				console.log("No se pudo crear el registro en la base de datos");
			})
		}
}

module.exports = userController;