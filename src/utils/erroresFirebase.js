export const erroresFirabase  = (code) => {
    switch (code) {
     case "auth/email-already-in-use":
          return "Usuario ya registrado"
     case "auth/invalid-email":
          return "Formato email no valido"

     case "auth/user-not-found" :
          return "Usuario no registrado"    
          case "auth/wrong-password" :
               return "La contraseña es incorrecta"         
     default:
            return "Ocurrió un error en el servidor";
         
      }
}
