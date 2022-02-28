module.exports = (sequelize,DataTypes) => {

    let alias = "Pelicula";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            null: false
        },
        Imagen: {
            type: DataTypes.STRING,
            null: true,
            default: null
        },
        Titulo: {
            type: DataTypes.STRING,
            null: false
        },
        FechaCreacion: {
            type: DataTypes.DATEONLY,
            null: true,
            default: null
        },
        Calificacion: {
            type: DataTypes.INTEGER,
            null: true,
            default: null
        },
        Genero_id: {
            type: DataTypes.INTEGER,
            foreingKey: true,
            null: true,
            default: null
        }
    }

    let config = {
        tableName: "pelicula",
        timestamps: false
    }

    const Pelicula = sequelize.define (alias,cols,config);

    Pelicula.associate = function(models){
        Pelicula.belongsTo(models.Genero,{
            as: "generos",
            foreignKey: "Genero_id",
            timestamps: false
        });
        Pelicula.belongsToMany(models.Personaje,{
            as: "peliculas",
            through: "personajePelicula",
            foreignKey: "Pelicula_id",
            otherKey: "Personaje_id",
            timestamps: false
        });
    }

    return Pelicula;
}