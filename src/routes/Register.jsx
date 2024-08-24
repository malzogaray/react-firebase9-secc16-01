import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirabase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title"; 

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirabase(error.code);
      setError("server", { message });
    }
  };

  return (
    <>
      <Title text="Registro"/> 
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingrese su correo"
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingrese su contraseña"
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Repita contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repita la contraseña"
        >
          <FormError error={errors.repassword} />
        </FormInput>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Registrar
        </button>

        </form>
    </>
  );
}

export default Register;
