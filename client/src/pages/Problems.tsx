import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import api from "../api/axios";

type Problem = {
    id: string
    title: string
    slug: string
    difficulty: string
    tags: string[]
}

function Problems() {
    const [problems, setProblems]= useState<Problem[]>([]);

    useEffect(()=>{
        const fetchProblems= async ()=>{
            const apiResponse = await api.get('/problems')
            setProblems(apiResponse.data)
        }
        fetchProblems();
    },[])


    return(
        <div className="pt-20 bg-gray-900 text-white min-h-screen p-8 space-y-3 ">
            <h1 className="text-4xl font-bold border-b-2 border-orange-400 py-3 " >Problems 🚀</h1>

            {problems.map((prob)=>(
                <Link 
                    key={prob.id } 
                    to={`/problems/${prob.slug}`} 
                    className="bg-gray-800 
                    border rounded-xl border-orange-900 p-4
                    hover:bg-gray-700 transform hover:scale-103 shadow-md hover:shadow-xl transition duration-200 
                    flex justify-between items-center">
                    <span>{prob.title}</span> 
                    <span
                        className={
                            prob.difficulty==="EASY" ? "bg-green-500/20 text-green-400 px-3 py-1 text-sm rounded-full " :
                            prob.difficulty==="MEDIUM" ? "bg-yellow-500/30 text-yellow-400 px-3 py-1 text-sm rounded-full" :
                            "bg-red-500/20 text-red-400 px-3 py-1 text-sm  rounded-full"
                            
                        }                    
                    >{prob.difficulty}</span>            
                </Link>
            ))}
        </div>
    )
}

export default Problems