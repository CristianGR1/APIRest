import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

import { Compra } from './Compras.js';

export const Producto = sequelize.define('Productos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    lote:{
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    precio:{
        type: DataTypes.DECIMAL
    },
    cantidad:{
        type: DataTypes.INTEGER
    },
    fecha:{
        type: DataTypes.DATE
    }
});

Producto.hasMany(Compra,{
    foreignKey:'productoid',
    sourceKey:'id'
});

Compra.belongsTo(Producto,{
    foreignKey:'productoid',
    targetId:'id'
});