import app from "./app.js";
import {sequelize} from "./database/database.js";

// import './models/Usuarios.js';
// import './models/Productos.js';
// import './models/Compras.js';


async function main(){
    try {
        await sequelize.sync({force:false});
        app.listen(4000);
        console.log('Servidor iniciado');
    } catch (error) {
        console.log('No se ha iniciado la BD');
    }
}

main();