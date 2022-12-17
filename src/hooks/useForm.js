import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});
    
    useEffect(() => {

        createValidators();
        
    }, [ formState ])

    useEffect(() => {
      
        setFormState( initialForm );
    
    }, [ initialForm ])
    

    const isFormValid = useMemo( () => {

        // ver si todas las propiedades tienen valur de null
        // si todos tienen null el formulario es valido

        for ( const formValue of Object.keys( formValidation ) ) {

            if ( formValidation[ formValue ] != null) return false;

        }

        return true;
    }, [ formValidation ] )
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        // Object.keys( formValidations ) = las keys del objeto
        for ( const formField of Object.keys( formValidations ) ) {
            
            // get the function and the message of the key in each iteration
            const [ fn, errorMessage ] = formValidations[ formField ]

            // en nuestro state va a tener un arreglo, el primer valor del arreglo es
            // el nombre, si tenemos un campo que se llama email, el valor sera emailValid,
            // y su segundo valor va a ser null o un mensaje de error, de acuerdo a cada una de 
            // las funciones que hay en formValidations
            formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;

        }

        setFormValidation( formCheckedValues );
        // console.log( formCheckedValues )


    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation, // enviar todas las propiedades de formValidations
        isFormValid
    }
}