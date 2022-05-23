import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

export const Compra = sequelize.define('Compras',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fecha:{
        type:DataTypes.DATE
    },
    cantidad:{
        type:DataTypes.INTEGER
    },
    total:{
        type:DataTypes.DECIMAL
    }
},{
    timestamps:false
});