import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


function Navbar(){
    const {token, Logout} = useContext(AuthContext);


    if(token){
        return(
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/problems'}>Problems</Link>
                <Link to={'/submissions'}>Submissions</Link>
                <button onClick={Logout}>Logout</button>
            </div>                 
        )
    }
    else{
        return(
            <div>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </div>                 
        )
    }
}

export default Navbar