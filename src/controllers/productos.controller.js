import {Producto} from '../models/Productos.js';
import {Usuario} from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';

//Pensando en hacer mas amigable con el usuario nuestra restAPI, al iniciar sesion, retornara un token, el cual contiene el id unico
//para dicho usuario, el cual se validara antes de realizar cualquier transaccion para determinar si tiene permisos suficientes para
//realizar dicha accion.
export const getProducts = async(req,res) => {
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
            msg: 'Token no válido'
        });
    }
    try {
        const products = await Producto.findAll();
        res.json(products);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al consultar los productos'
        })
    }

}

export const createProducts = async(req,res) => {
    try {
        const producto = new Producto( req.body );
        console.log(producto);
        // Guardar producto
        await producto.save();

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al crear el producto'
        })
    }
}

export const updateProducts = async(req,res) => {

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
            msg: 'Token no válido'
        });
    }

    const {id} = req.params;
    const {lote,nombre,precio,cantidad,fecha} = req.body;

    try {
        const product = await Producto.findByPk(id);
        
        product.lote = lote;
        product.nombre = nombre;
        product.precio = precio;
        product.cantidad = product.cantidad + cantidad;
        product.fecha = fecha;

        await product.save();

        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado con exito',
            product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al actualizar el producto'
        })
    }
}

export const deleteProducts = async(req,res) => {
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
            msg: 'Token no válido'
        });
    }

    const {id} = req.params;
    try {
        await Producto.destroy({
            where:{
                id
            }
        });
        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado con exito'
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Ocurrio un error al eliminar el producto'
        })
    }

}