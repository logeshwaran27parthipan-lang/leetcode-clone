import { useState, useEffect } from "react"
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
        <div>
            <h1>Problems Page</h1>
            {problems.map((prob)=>(
                <p key={prob.id}>{prob.title}</p>
            ))}
        </div>
    )
}

export default Problems