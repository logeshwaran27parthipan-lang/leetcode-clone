import { useState, useContext} from "react"
import api from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
 

function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const {Login} = useContext(AuthContext)
    
    const navigate = useNavigate()

   



    const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=>{ // React.FormEvent is correct here (React synthetic event); TS "deprecated" warning comes from DOM types — safe to ignore
        e.preventDefault();
        try{
            setIsLoading(true)
            const res = await api.post('/auth/login', {email, password})
            Login(res.data.token)
            navigate('/')
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
            alert(error.response?.data?.message || "Login failed")
         } 
            else {
                alert("Login failed")
            }
        }
        finally {
            setIsLoading(false);
        }
    
    }
    const inputClass = "bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 border border-orange-300 rounded-md px-3 py-1 w-full"

    return(
        <div className="pt-20  bg-gray-900 min-h-screen text-white justify-items-center">
            <h1 className="text-4xl font-bold p-8">Login 🚀</h1> 
                <form 
                onSubmit={handleLogin}
                className="flex flex-col gap-6 p-8 max-w-md w-full
                border border-orange-300 border-solid rounded-lg">
                    <input
                        className={inputClass}
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    <input 
                        className={inputClass}
                        type="password" 
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        <button 
                            className="bg-orange-500 px-20 py-2 rounded-lg hover:bg-orange-600 shadow-lg transition inline-block "
                            type="submit"
                            disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                </form>
        </div>
    )
}

export default Login