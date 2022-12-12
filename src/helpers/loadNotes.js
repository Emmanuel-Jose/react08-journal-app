import { FirebaseDB } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";

export const loadNotes = async( uid = '' ) => {

    if ( !uid ) throw new Error( 'El uid del usuario no existe' );

    // referencia a la coleccion de notas de Firebase
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    const notes = []
    
    // obtener los datos que se encuentran en docs, ya que ahi solo tenemos la referencia a los documentos
    docs.forEach( doc => {

        notes.push({ id: doc.id, ...doc.data() });

    });

    return notes;


}