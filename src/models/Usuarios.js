import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

import { Compra } from './Compras.js';

export const Usuario = sequelize.define('Usuarios',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    identificacion:{
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    apellido:{
        type: DataTypes.STRING
    },
    rol:{
        type: DataTypes.STRING
    },
    contrasena:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    }
},{
    timestamps:false
});

Usuario.hasMany(Compra,{
    foreignKey:'usuarioid',
    sourceKey:'id'
});

Compra.belongsTo(Usuario,{
    foreignKey:'usuarioid',
    targetId:'id'
});