import {Compra} from '../models/Compras.js';
import {Usuario} from '../models/Usuarios.js';
import {Producto} from '../models/Productos.js';
import jwt from 'jsonwebtoken';

//Pensando en hacer mas amigable con el usuario nuestra restAPI, al iniciar sesion, retornara un token, el cual contiene el id unico
//para dicho usuario, el cual se validara antes de realizar cualquier transaccion para determinar si tiene permisos suficientes para
//realizar dicha accion.
export const getCompras = async(req,res) => {
    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petici�n'
        });
    }

    try {
        const { id } = jwt.verify( token, 'Holsdj28397kjHd7@asdyui3897k' );

        const usuarioDB = await Usuario.findByPk(id);

        if(!usuarioDB){
            res.status(500).json({
                ok: false,
                msg: 'El usuario a realizar la compra no es valido'
            })
        } 
    
        if(usuarioDB.rol !== 'Administrador'){
            res.status(500).json({
                ok: false,
                msg: 'El usuario no tiene permisos para realizar esta accion'
            })
        }

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no v�lido'
        });
    }

    try {
        const compras = await Compra.findAll();
        res.json(compras);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al consultar el listado de compras'
        })
    }

}

export const createCompra = async(req,res) => {
    const objdatos = req.body;
    var usuarioid;
    var total = 0;
    var objresult = [];
    var totalpagado;

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify( token, 'Holsdj28397kjHd7@asdyui3897k' );
        usuarioid = id;
        const usuarioDB = await Usuario.findByPk(id);

        if(!usuarioDB){
            res.status(500).json({
                ok: false,
                msg: 'El usuario a realizar la compra no es valido'
            })
        } 
        if(usuarioDB.rol !== 'Cliente'){
            res.status(500).json({
                ok: false,
                msg: 'El usuario no tiene permisos para realizar esta accion'
            })
        }

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


    try {
        objdatos.forEach(async function(item){
            
            const {fecha,cantidad,producto} = item;
            const productoDB = await Producto.findOne({
                where:{
                    id:producto
                }
            });
    
            if(!productoDB){
                res.status(500).json({
                    ok: false,
                    msg: 'El producto de codigo '+producto+' no es valido'
                })
            }
    
            total = productoDB.precio * cantidad;
            const compra = new Compra({
                fecha:fecha,
                cantidad:cantidad,
                total:total,
                usuarioid:usuarioid,
                productoid:producto
            });
            
            objresult.push(compra);
            totalpagado = totalpagado + total;
            // Guardar Compra
            await compra.save();

        });
        console.log('totalpagado',totalpagado)
        res.json({
            ok: true,
            objresult,
            totalfactura: totalpagado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al crear la compra'
        })
    }
}

export const getComprasbyId = async(req,res) => {
    var usuarioid;
    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify( token, 'Holsdj28397kjHd7@asdyui3897k' );
        usuarioid = id;
        
        const usuarioDB = await Usuario.findByPk(id);

        if(!usuarioDB){
            res.status(500).json({
                ok: false,
                msg: 'El usuario a realizar la compra no es valido'
            })
        } 

        if(usuarioDB.rol !== 'Cliente'){
            res.status(500).json({
                ok: false,
                msg: 'El usuario no tiene permisos para realizar esta accion'
            })
        }

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    console.log('..............',usuarioid);
    try {
        const compras = await Compra.findAll({
            where:{
                usuarioid:usuarioid
            }
        });

        if(!compras){
            res.status(500).json({
                ok: false,
                msg: 'El cliente no tiene compras asociadas'
            })
        }
        res.json(compras);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al consultar los productos'
        })
    }

}
