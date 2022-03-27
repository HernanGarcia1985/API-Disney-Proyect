module.exports = (sequelize,DataTypes) => {

    let alias = "Usuario";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            null: false
        },
        Email: {
            type: DataTypes.STRING,
            null: false
        },
        Password: {
            type: DataTypes.STRING,
            null: false
        }
    }

    let config = {
        tableName: "Usuario",
        timestamps: false
    }

    const Usuario = sequelize.define (alias,cols,config);

    Usuario.associate = function(models){
        //Usuario.belongsToMany(models.Producto,{
        //    as: "productos",
        //    through: "productoUsuario",
        //    foreignKey: "id_usuario",
        //    otherKey: "id_producto",
        //    timestamps: false
        //});
    }

    return Usuario;
}