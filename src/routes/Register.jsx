import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "mar@mar.com",
      password: "123456",
      repassword: "123456",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      await registerUser(email, password);
      console.log('Usuario creado');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log("Ya está registrado este correo");
          setError("email", {
            type: "manual",
            message: "Usuario ya registrado",
          });
          break;
        default:
          console.log('Ocurrió un error en el servidor');
          break;
      }
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="email" 
          placeholder="Ingrese email" 
          {...register("email", {
            required: {
              value: true,
              message: 'Campo obligatorio',
            },
            pattern: {
              value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input 
          type="password" 
          placeholder="Ingrese contraseña" 
          {...register("password", {
            minLength: {
              value: 6,
              message: "Mínimo ingresar 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {  
                  return "No puede estar vacío";
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input 
          type="password" 
          placeholder="Repita contraseña" 
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "Las contraseñas no coinciden",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}

        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}

export default Register;
