const db = require('../database/models');
const Personaje = require('../database/models/personaje');


const personajeController = {

    todosLosPersonajes: (req, res) => {

		let resultado = {
			link: "http://localhost:3000/characters",
			cantidad: 0,
			data: []
		}

                db.Personaje.findAll({attributes: ['Imagen','Nombre']})
                    .then((totalDePersonajes) => {
                        if(totalDePersonajes){
                            resultado.data = totalDePersonajes; 
                            resultado.cantidad = totalDePersonajes.length;
                            res.status(200).json(resultado);
                        }
                    })
                    .catch(function(error){
                        console.log("No se pudo acceder a la base de datos");
                    })
                    
    },

    personajesPorId: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters/:id",
            cantidad: 0,
            data: []
        }

                let promesaPersonaje = db.Personaje.findByPk(req.params.id);
                let promesaPelicula = db.Pelicula.findAll({
                    attributes: ['Titulo'],
                    where:{Personaje_id:req.params.id},
                    include:[{association:'peliculas'}]
                });

                Promise.all([promesaPersonaje,promesaPelicula])
                    .then(function([resultadoPersonaje,resultadoPelicula]){
                        if(resultadoPersonaje){
                            resultado.data.push(resultadoPersonaje.dataValues);
                            resultado.cantidad = 1;
                            if(resultadoPelicula){
                                resultado.data.push(resultadoPelicula.dataValues);
                            }
                        }
                        res.status(200).json(resultado);
                    })
                    .catch(function(error){
                        console.log("No se pudo acceder a la base de datos");
                    })
                   
    },

    personajesCreate: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findOne( //Buscar personaje por nombre y si no esta crearlo
                    {
                        where: {Nombre:req.body.nombre}
                    }
                )
                .then((personaje)=>{
                    if(personaje){
                        resultado.data.push('El personaje ya existe');
                        res.status(200).json(resultado);
                    }
                    else{
                        db.Personaje.create({
                            Imagen: "/images/" + req.file.filename,
                            Nombre: req.body.nombre ,
                            Edad: req.body.edad,
                            Peso: req.body.peso,
                            Historia: req.body.historia
                        });
                        resultado.data.push('El personaje se creó exitosamente');
                        resultado.cantidad = 1;
                        res.status(201).json(resultado);
                    }
                })
                .catch(function(error){
                    console.log("No se pudo acceder a la base de datos");
                })
           
    },

    personajesUpdate: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters/:id",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.update(
                    {Imagen: "/images/" + req.file.filename,
                    Nombre: req.body.nombre ,
                    Edad: req.body.edad,
                    Peso: req.body.peso,
                    Historia: req.body.historia,
                    },
                    {where: {id:req.params.id}}
                );
                resultado.data.push('El personaje se actualizó exitosamente');
                resultado.cantidad = 1;
                res.status(201).json(resultado);
          
    },

    personajesDestroy: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters/:id",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findByPk(req.params.id)
                .then((personaje) =>{
                    fs.unlinkSync(path.join(__dirname, '../../public/images/', personaje.Imagen));
                })
                .catch(function(error){
                    console.log("error!");
                })

                db.Personaje.destroy({
                    where: {
                        id:req.params.id
                    }
                });
                resultado.data.push('El personaje ha sido borrado');
                resultado.cantidad = 1;
                res.status(200).json(resultado);
                       
    },

    personajesPorNombre: (req, res) => {     //Instalar Op y buscar con Like
        
        let resultado = {
            link: "http://localhost:3000/characters?name",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findAll({
                    where:{Nombre:req.query.name}
                })
                .then((personajes) => {
                    if(personajes){
                        resultado.data = personajes; 
                        resultado.cantidad = personajes.length;
                        res.status(200).json(resultado);
                    }
                })
                .catch(function(error){
                    console.log("No se pudo acceder a la base de datos");
                })
           
    },

    personajesPorEdad: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters?age",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findAll({
                    where:{Edad:req.query.age}
                })
                .then((personajes) => {
                    if(personajes){
                        resultado.data = personajes; 
                        resultado.cantidad = personajes.length;
                        res.status(200).json(resultado);
                    }
                })
                .catch(function(error){
                    console.log("No se pudo acceder a la base de datos");
                })
           
    },

    personajesPorPeso: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters?weight",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findAll({
                    where:{Peso:req.query.weight}
                })
                .then((personajes) => {
                    if(personajes){
                        resultado.data = personajes; 
                        resultado.cantidad = personajes.length;
                        res.status(200).json(resultado);
                    }
                })
                .catch(function(error){
                    console.log("No se pudo acceder a la base de datos");
                })
           
    },

    personajesPorPeliculaId: (req, res) => {

        let resultado = {
            link: "http://localhost:3000/characters?movie",
            cantidad: 0,
            data: []
        }

        
                db.Personaje.findAll({
                    where:{Pelicula_id:req.query.movie},
                    include:[{association:'personajes'}]
                })
                .then((personajes) => {
                    if(personajes){
                        resultado.data = personajes; 
                        resultado.cantidad = personajes.length;
                        res.status(200).json(resultado);
                    }
                })
                .catch(function(error){
                    console.log("No se pudo acceder a la base de datos");
                })
          
    }
}

module.exports = personajeController;