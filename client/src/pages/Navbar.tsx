import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


function Navbar(){
    const {token, Logout} = useContext(AuthContext);


    return(
        <div className="bg-gray-900 px-6 py-4 text-white shadow-lg font-semibold flex items-center justify-between fixed top-0 left-0 w-full">
             <Link to="/" className="text-orange-500 font-bold text-xl">LeetCode Clone</Link>
             <div className="flex gap-6 items-center">
                {token?(
                    <>
                        <Link to="/" className="hover:text-orange-400 transition duration-200">Home</Link>
                        <Link to="/problems" className="hover:text-orange-400 transition duration-200">Problems</Link>
                        <Link to="/submissions" className="hover:text-orange-400 transition duration-200">Submissions</Link>

                        <button 
                            onClick={Logout}
                            className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg font-semibold transition duration-200"
                        >
                            Logout

                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-orange-400 text-sm transition duration-200">Login</Link>
                        <Link to="/register" className="hover:text-orange-400 transition duration-200">Register</Link>
                    </>
                )
                }
             </div>
            
        </div>
    )
}


export default Navbar