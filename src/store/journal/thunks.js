import { doc, collection, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";

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