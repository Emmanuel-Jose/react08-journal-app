import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 123,
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [],
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';

        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {

            state.isSaving = false;

            state.notes = state.notes.map( ( note ) => {

                // actualiza la nota activa en el array de notas
                // si el id de la nota actualizada coincide con el id de la nota del array regresar la nota actualizada
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });
            // state.notes = state.notes.map( ( note ) => note.id === state.active.id ? state.active : note );
            state.messageSaved = `${ action.payload.title } actualizado correctamente`;
        },
        deleteNoteById: ( state, action ) => {

        },
        setImageToActiveNote: ( state, action ) => {
            // spread para mantener las fotografias anteriores
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setImageToActiveNote
} = journalSlice.actions;