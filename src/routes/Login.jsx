import { useContext} from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirabase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";

const Login = () => {
   
    
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const  { required,patternEmail, minLength, validateTrim} = formValidate()

    const {
        register,
        handleSubmit,
        formState:{errors},
        getValues,
        setError,
      } = useForm();

      const onSubmit = async ({email, password}) => {
        try {
          await loginUser(email, password);
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
            <h1>Login</h1>
            <FormError error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                  type="email" 
                  placeholder="Ingrese email" 
                    {...register("email", {
                  required,
                  pattern: patternEmail,
                    })}>   
               <FormError error={errors.firebase} />
               </ FormInput>

               <FormInput 
                  type="password" 
                  placeholder="Ingrese contraseña" 
                  {...register("password", {
                    minLength,
                    validate: validateTrim,
                  })}>

                 <FormError error={errors.password}  />
                 </FormInput>  

                <button type="submit">Login</button>

            </form>
        </>
    );
};

export default Login;
