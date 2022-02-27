module.exports = (sequelize,DataTypes) => {

    let alias = "personajePelicula";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            null: false
        },
        Personaje_id: {
            type: DataTypes.INTEGER,
            foreingKey: true,
            null: true,
            default: null
        },
        Pelicula_id: {
            type: DataTypes.INTEGER,
            foreingKey: true,
            null: true,
            default: null
        }
    }

    let config = {
        tableName: "personaje_Pelicula",
        timestamps: false
    }

    const personajePelicula = sequelize.define (alias,cols,config);

    personajePelicula.associate = function(models){
        //Usuario.belongsToMany(models.Producto,{
        //    as: "productos",
        //    through: "productoUsuario",
        //    foreignKey: "id_usuario",
        //    otherKey: "id_producto",
        //    timestamps: false
        //});
    }

    return personajePelicula;
}