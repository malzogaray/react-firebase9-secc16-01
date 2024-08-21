import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirabase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

  const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const  { required,patternEmail, minLength, validateTrim,validateEquals } = formValidate()


  const {
    register,
    handleSubmit,
    formState:{errors},
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({email, password}) => {
    try {
      await registerUser(email, password);
            navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase",{
        message: erroresFirabase (error.code),
      }  )
      
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <FormError error={errors.firebase}  />
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
                  type="email" 
                  placeholder="Ingrese email" 
                    {...register("email", {
                  required,
                  pattern: patternEmail,
                    })}>   
              <FormError error={errors.email} />
        </FormInput>
     
   

       <FormInput 
                  type="password" 
                  placeholder="Ingrese contraseña" 
                  {...register("password", {
                    minLength,
                    validate: validateTrim,
                  })}>
                 <FormError error={errors.password}  />
       </FormInput>

 

        <FormInput
                    type="password" 
                    placeholder="Repita contraseña" 
                    {...register("repassword", {
                  validate: validateEquals(getValues),
                    })}
                  >
         <FormError error={errors.repassword}/>
       </FormInput>

               

        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}

export default Register;
