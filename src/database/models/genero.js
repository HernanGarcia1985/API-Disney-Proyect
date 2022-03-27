module.exports = (sequelize,DataTypes) => {

    let alias = "Genero";

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
        }
    }

    let config = {
        tableName: "Genero",
        timestamps: false
    }

    const Genero = sequelize.define (alias,cols,config);

    Genero.associate = function(models){
        Genero.hasMany(models.Pelicula,{
            as: "peliculasgen",
            foreignKey: "Genero_id",
            timestamps: false
        });
    }

    return Genero;
}