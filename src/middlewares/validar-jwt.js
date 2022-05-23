import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {

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
        req.id = id;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}