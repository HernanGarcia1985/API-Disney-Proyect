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
        tableName: "genero",
        timestamps: false
    }

    const Genero = sequelize.define (alias,cols,config);

    Genero.associate = function(models){
        //Usuario.belongsToMany(models.Producto,{
        //    as: "productos",
        //    through: "productoUsuario",
        //    foreignKey: "id_usuario",
        //    otherKey: "id_producto",
        //    timestamps: false
        //});
    }

    return Genero;
}