import { useState, useEffect } from "react"
import api from "../api/axios"

type SubmissionsTypes = {
    id: string
    code: string
    status: string
    submittedAt: string
    userId: string
    problemId: string
    problem: {
        title: string
        slug: string
    }
}

function Submissions(){

    const [submissions, setSubmissions] = useState<SubmissionsTypes[]>([])
    const [expandedId, setExpandedId] = useState<string | null>(null)

    useEffect( ()=>{
        const fetchSubmissions = async ()=>{
            const response = await api.get('/submissions/me')
            setSubmissions(response.data)
        }
        fetchSubmissions()

    },[])

    const toggleCode = (id: string)=>{
        setExpandedId(expandedId === id ? null :id)
    }
    

    return(
        <div className="pt-20 bg-gray-900 text-white min-h-screen p-8 space-y-3 ">
            <h1 className="text-3xl font-bold border-b-2 border-orange-400 py-1 ">Submissions 🚀</h1>

            {submissions.map((item)=>(
                <div 
                    className="grid grid-cols-[3fr_1fr_3fr_1fr] items-center bg-gray-800 
                    border rounded-xl border-orange-900 p-4
                    hover:bg-gray-700 transform hover:scale-103 shadow-md hover:shadow-xl transition duration-200 "
                    key={item.id}>  
                    <p>{item.problem.title}</p>   
                    <p className={`text-center font-bold ${
                        item.status === "ACCEPTED" ? "text-green-400" : "text-red-400"
                        }`}>{item.status}</p> 
                    <p className="text-center">{new Date(item.submittedAt).toLocaleString()}</p> 
                    <button 
                        className="bg-orange-500 border-orange-400 text-center rounded-full  p-2 w-28 "
                        onClick={() => toggleCode(item.id)}>
                        {expandedId === item.id ? "Hide Code" : "View Code"}
                    </button>
                    {expandedId === item.id && <pre className="col-span-4 mt-4 bg-white text-black p-2 text-wrap border rounded-lg border-orange-500">{item.code}</pre>} 
            
                </div>
                
            ))}

        </div>
    )
}

export default Submissions