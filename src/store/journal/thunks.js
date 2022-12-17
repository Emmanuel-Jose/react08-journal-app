import { doc, collection, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {

    //getState es una funcion que thunks acepta y que nos devuelve todo el estado
    // todo lo que está en el store
    return async( disptach, getState ) => {

        disptach( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Document reference
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        disptach( addNewEmptyNote( newNote ) )
        disptach( setActiveNote( newNote ) )

    }

}

export const startLoadingNotes = ( ) => {
    
        return async( dispatch, getState ) => {
    
            const { uid } = getState().auth;

            if ( !uid ) throw new Error( 'El uid del usuario no existe' )

            const notes = await loadNotes( uid );
            dispatch( setNotes( notes ) );
        }
    
}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        console.log( noteToFirestore );

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFirestore, { merge: true } );

        dispatch( updateNote( note ) );

    }

}