import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from '../api/axios'

type problemDetail = {
    id: string
    title: string
    slug: string
    difficulty: string
    description: string
    tags: string[]
}

function ProblemDetail() {

    const [problemDetail, setProblemDetail] = useState<problemDetail | null>(null);
    const {slug} = useParams();

    useEffect(()=>{
        const fetchProblemDetail = async ()=>{
            const apiResponse = await api.get(`/problems/${slug}`, )
            setProblemDetail(apiResponse.data)
        }
        fetchProblemDetail()
    },[slug])
    if (!problemDetail) return <div>Loading...</div>
    return(
        <div>
            <h1>Problem Detail Page</h1>
            <p>{problemDetail.title}</p>
            <p>{problemDetail.difficulty}</p>
            <p>{problemDetail.description}</p>
            <p>{problemDetail.tags}</p>
        </div>
    )
}

export default ProblemDetail