export const formValidate = (getValues) => {
  
  return {
    required: {
        value: true,
        message: 'Campo obligatorio',
      },
      patternEmail: {
        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
        message: "Formato de email incorrecto",
      },
      minLength: {
        value: 6,
        message: "Mínimo ingresar 6 caracteres",
      },
      validatetrim:{
        trim: (v) => {
            if (!v.trim()) {  
              return "No puede estar vacío";
            }
            return true;
          },
    
      },
          validateEquals (getValues){
          return {
            equals: (v) =>
              v === getValues("password") || 
            "Las contraseñas no coinciden",
          };
      },
    }
    
}
