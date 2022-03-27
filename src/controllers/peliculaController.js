const db = require('../database/models');
const Pelicula = require('../database/models/pelicula');


const peliculaController = {

    todasLasPeliculas: (req, res) => {

		let resultado = {
			link: "http://localhost:3000/movies",
			cantidad: 0,
			data: []
		}

        
                db.Pelicula.findAll({
                    attributes: ['Imagen','Titulo','FechaCreacion']})
                        .then((totalDePeliculas) => {
                            if(totalDePeliculas){
                                resultado.data = totalDePeliculas;
                                resultado.cantidad = totalDePeliculas.length;
                                res.json(resultado);
                            }
                        })
                        .catch(function(error){
                            console.log("No se pudo acceder a la base de datos");
                        })
           
    },

        peliculaPorId: (req, res) => {
			let resultado = {
				link: "http://localhost:3000/movies/:id",
				cantidad: 0,
				data: []
			}

            
                    let promesaPelicula = db.Pelicula.findByPk(req.params.id);
                    let promesaPersonaje = db.Personaje.findAll({
                        attributes: ['Nombre'],
                        where:{Pelicula_id:req.params.id},
                        include:[{association:'personajes'}]
                    });

                    Promise.all([promesaPelicula,promesaPersonaje])
                        .then(function([resultadoPelicula,resultadoPersonaje]){
                            if(resultadoPelicula){
                                resultado.data.push(resultadoPelicula.dataValues);
                                resultado.cantidad = 1;
                                if(resultadoPersonaje){    
                                    resultado.data.push(resultadoPersonaje.dataValues);	
                                }
                            }
                            res.json(resultado);
                        })
                        .catch(function(error){
                            console.log("No se pudo acceder a la base de datos");
                        })
                           
        },

        peliculaCreate: (req, res) => {

            let resultado = {
				link: "http://localhost:3000/movies/",
				cantidad: 0,
				data: []
			}

            
                    db.Pelicula.findOne( //Buscar pelicula por titulo y si no esta crearla
                        {
                            where: {Titulo:req.body.titulo}
                        }
                    )
                    .then((pelicula)=>{
                        if(pelicula){
                            resultado.data.push('La pelicula ya existe');
                            res.json(resultado);
                        }
                        else{
                            db.Pelicula.create({
                                Imagen: "/images/" + req.file.filename,
                                Titulo: req.body.titulo ,
                                FechaCreacion: req.body.fechaCreacion,
                                Calificacion: req.body.calificacion,
                                Genero_id: req.body.genero
                            });
                            resultado.data.push('La pelicula se creó exitosamente');
                            resultado.cantidad = 1;
                            res.json(resultado);
                        }
                    })
                    .catch(function(error){  
                        console.log("No se pudo acceder a la base de datos");
                    })
                      
        },

        peliculaUpdate: (req, res) => {

            let resultado = {
				link: "http://localhost:3000/movies/:id",
				cantidad: 0,
				data: []
			}

            
                    db.Pelicula.update(
                        {Imagen: "/images/" + req.file.filename,
                        Titulo: req.body.titulo ,
                        FechaCreacion: req.body.fechaCreacion,
                        Calificacion: req.body.calificacion,
                        Genero_id: req.body.genero
                        },
                        {where: {id:req.params.id}}
                    );
                    resultado.data.push('La pelicula se actualizó exitosamente');
                    resultado.cantidad = 1;
                    res.json(resultado);
                   
        },

        peliculaDestroy: (req, res) => {

            let resultado = {
				link: "http://localhost:3000/movies/:id",
				cantidad: 0,
				data: []
			}

            
                    db.Pelicula.findByPk(req.params.id)
                    .then((pelicula) =>{
                        fs.unlinkSync(path.join(__dirname, '../../public/images/', pelicula.Imagen));
                    })
                    .catch(function(error){
                        console.log("error!");
                    })

                    db.Pelicula.destroy({
                        where: {
                            id:req.params.id
                        }
                    });
                    resultado.data.push('La pelicula ha sido borrada');
                    resultado.cantidad = 1;
                    res.json(resultado);
                       
        },

        peliculasPorTitulo: (req, res) => {     //Instalar Op y buscar con Like
			let resultado = {
				link: "http://localhost:3000/movies?name",
				cantidad: 0,
				data: []
			}

            
                    db.Pelicula.findAll({
                        where:{Titulo:req.query.name},
                        order:[['Titulo',req.query.order]]
                    })
                    .then((peliculas) => {
                        if(peliculas){
                            resultado.data = peliculas; 
                            resultado.cantidad = peliculas.length;
                            res.status(200).json(resultado);
                        }
                    })
                    .catch(function(error){
                        console.log("No se pudo acceder a la base de datos");
                    })
             
        },

        peliculasPorGeneroId: (req, res) => {
			let resultado = {
				link: "http://localhost:3000/movies?genre",
				cantidad: 0,
				data: []
			}

            
                    db.Pelicula.findAll({
                        attributes: ['Imagen','Titulo','FechaCreacion','Calificacion','Nombre'],
                        where:{Genero_id:req.query.genre},
                        order:[['Genero_Id',req.query.order]],
                        include:[{association:'generos'}]
                    })
                    .then((peliculas) => {
                        if(peliculas){
                            resultado.data = peliculas; 
                            resultado.cantidad = peliculas.length;
                            res.status(200).json(resultado);
                        }
                    })
                    .catch(function(error){
                        console.log("No se pudo acceder a la base de datos");
                    })
              
        }
}

module.exports = peliculaController;