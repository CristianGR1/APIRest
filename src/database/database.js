import { Sequelize } from "sequelize";

export const sequelize =  new Sequelize('APIRest','postgres','drag1208',{
    host:'localhost',
    dialect:'postgres'
})