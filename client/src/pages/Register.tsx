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
        catch {
            alert("Register failed. Please check your credentials.")
        }
    }
    const inputClass = "bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 border border-orange-300 rounded-md px-3 py-1 w-full"    

    return(
        <div className="pt-20  bg-gray-900 min-h-screen text-white justify-items-center">
            <h1 className="text-4xl font-bold p-8">Register 🚀</h1>
            <form 
                onSubmit={handleRegister} 
                className="flex flex-col gap-6 p-8 max-w-md w-full
                border border-orange-300 border-solid rounded-lg">
                <input 
                    className={inputClass}
                    type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                     />
                <input 
                    className={inputClass}                    
                    type="text" 
                    placeholder="Enter Username" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}/>
                <input 
                    className={inputClass}
                    type="password" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>

                    <button 
                        type="submit"
                        className="bg-orange-500 px-20 py-2 rounded-lg hover:bg-orange-600 shadow-lg transition inline-block ">
                            Register
                    </button>
                    {error && <p className="text-red-400 text-center text-sm border rounded-md">{error}</p>}
            </form>
        </div>
    )
}

export default Register