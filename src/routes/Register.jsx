import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [email,setemail] = useState ('martin@test.com ')
  const [password, setPassword] = useState ('123456 ')

  const navegate = useNavigate()

  const {registerUSer} = useContext (UserContext)

  const handleSubmit =  async (e)=> {
        e.preventDefault()
        console.log("procesando form:" , email, password );
        try {
            await registerUSer(email,password)
            const navegate = useNavigate()
            console.log('usuario creado')
            navegate("/")
        } catch (error) {
            console.log(error.code);
        }
         };

    return (
        <>
            <h1>Register</h1>
            <form  onSubmit={handleSubmit}> 
             <input 
                type="email" 
                placeholder="ingrese email" 
                value={email}
                onChange={(e) => setemail (e.target.value) }
                />
                   <input type="password" 
                placeholder="ingrese password" 
                value={password}
                onChange={ (e) => setPassword (e.target.value) }
                />
                <button type="submit" >Register</button>
            </form>
        
        </>
  )
}

export default Register
