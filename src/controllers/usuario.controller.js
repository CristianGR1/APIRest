import {Usuario} from '../models/Usuarios.js';
import { generarJWT } from '../helpers/jwt.js';


export const getSesion = async(req,res) => {
    const { email, contrasena } = req.body;
    var validPassword;
    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ 
               where:{ 
                   email 
               }
            });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        if(usuarioDB.contrasena !== contrasena){
            validPassword = false;
        }else{
            validPassword = true;
        }
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


export const createUser = async(req,res) => {
    const { email } = req.body;
    console.log(email);
    try {

        const existeEmail = await Usuario.findOne({ 
            where:{ 
                email 
            }
         });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
        console.log('-------',usuario);
        // Guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}