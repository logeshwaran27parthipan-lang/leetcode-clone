import { Link } from "react-router-dom"

function Home(){
    return(
        <div className="pt-20 bg-gray-900 text-white min-h-screen flex flex-col gap-6 justify-center items-center text-center ">
            <h2 className="text-4xl font-bold ">Welcome to LeetCode Clone 🚀</h2>
            <p className="text-gray-500">Practice coding. Improve skills.</p>
            <Link 
                to="/problems" 
                className="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 shadow-lg transition inline-block">
                    Start Solving
            </Link>
        </div>
    )
}

export default Home