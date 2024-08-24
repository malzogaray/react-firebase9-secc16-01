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
        setError,
      } = useForm();

      const onSubmit = async ({email, password}) => {
        try {
          await loginUser(email, password);
                navigate("/");
        } catch (error) {
          const {code,message} = erroresFirabase(error.code)
          setError("code",{ message });
      };
   
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="ingresa tu correo"
                  type="email" 
                  placeholder="Ingrese email" 
                    {...register("email", {
                  required,
                  pattern: patternEmail,
                    })}>   
               <FormError error={errors.firebase} />
               </ FormInput>

               <FormInput 
                  label="ingresa contraseña"
                  type="password" 
                  placeholder="Ingrese contraseña" 
                  {...register("password", {
                    minLength,
                    validate: validateTrim,
                  })}>

                 <FormError error={errors.password}  />
                 </FormInput>  

                 <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
            </form>
        </>
    );
};

export default Login;
