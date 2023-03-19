export function  ErrHandler  ( callbackFunc ) {
    try {
        callbackFunc();
    }
    catch(e){
        console.log( `[ERROR AT FUNCTION ${callbackFunc.name}] ${e}`)
    }
}



export const reset_selection = () => ({
    port : null,
    port_type : null,
    device:null,
    cable : null,
  })