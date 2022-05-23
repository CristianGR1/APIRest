import jwt from 'jsonwebtoken';

export const generarJWT = ( id ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            id,
        };
    
        jwt.sign( payload, 'Holsdj28397kjHd7@asdyui3897k', {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

    });

}
