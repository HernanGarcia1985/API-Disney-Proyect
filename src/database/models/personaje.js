module.exports = (sequelize,DataTypes) => {

    let alias = "Personaje";

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
        Nombre: {
            type: DataTypes.STRING,
            null: false
        },
        Edad: {
            type: DataTypes.INTEGER,
            null: true,
            default: null
        },
        Peso: {
            type: DataTypes.INTEGER,
            null: true,
            default: null
        },
        Historia: {
            type: DataTypes.TEXT,
            null: true,
            default: null
        }
    }

    let config = {
        tableName: "Personaje",
        timestamps: false
    }

    const Personaje = sequelize.define (alias,cols,config);

    Personaje.associate = function(models){
        Personaje.belongsToMany(models.Pelicula,{
            as: "personajes",
            through: "personajePelicula",
            foreignKey: "Personaje_id",
            otherKey: "Pelicula_id",
            timestamps: false
        });
    }

    return Personaje;
}