import { useState, useContext } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Register() {

    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    const {Login} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>)=>{ // React.FormEvent is correct here (React synthetic event); TS "deprecated" warning comes from DOM types — safe to ignore
        e.preventDefault();
        try{
            if(!email || !username || !password){
                return setError("All fields are required")
            }
            if(password.length<8){
                return setError("Password must be at least 8 characters")
            }
            if(!/[!@#$%^&*]/.test(password)){
                return setError("Password must contain at least one special character")
            }
            const res = await api.post('/auth/register', {email, username, password})
            Login(res.data.token)
            navigate('/')
                     
        }
        catch (error: any) {
            alert(error.response?.data?.message || "Register failed");
        }
    }

    return(
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                <input 
                    type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                     />
                <br />
                <input 
                    type="text" 
                    placeholder="Enter Username" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}/>
                <br />
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Register</button>
                    {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Register