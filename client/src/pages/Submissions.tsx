import { useState, useEffect } from "react"
import api from "../api/axios"

type  SubmissionsTypes ={
    id: string;
    code: string;
    status: string;
    submittedAt: string;
    userId: string;
    problemId: string;
}

function Submissions(){

    const [submissions, setSubmissions] = useState<SubmissionsTypes[]>([])

    useEffect( ()=>{
        const fetchSubmissions = async ()=>{
            const response = await api.get('/submissions/me')
            setSubmissions(response.data)
        }
        fetchSubmissions()

    },[])
    

    return(
        <div>
            <h1>Submissions Page</h1>

            {submissions.map((item)=>(
                <div key={item.id}>
                    <p>{item.userId}</p>    
                    <p>{item.problemId}</p>   
                    <p>{item.status}</p> 
                    <p>{item.submittedAt}</p>                 
                </div>
                
            ))}

        </div>
    )
}

export default Submissions