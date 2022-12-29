
export const fileUpload = async( file ) => {

    if (!file ) throw new Error( 'No hay archivo a subir' )

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dbp8jxvfi/image/upload';

    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal' );
    formData.append( 'file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( !resp.ok ) throw new Error( 'Error al subir la imagen' );

        const cloudResponse = await resp.json();

        return cloudResponse.secure_url;
        

    } catch ( error ) {
        console.log( error )
        throw new Error( error.message );
    }

}