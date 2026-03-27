import { useState, useContext} from "react"
import api from "../api/axios";
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
        catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
        finally {
            setIsLoading(false);
        }
    
    }
    

    return(
        <div>
            <h1>Login Page</h1> 
                <form onSubmit={handleLogin}>
                    <input
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    <br />
                    <input 
                        type="password" 
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                </form>
        </div>
    )
}

export default Login