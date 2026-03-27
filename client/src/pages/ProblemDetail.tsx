import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import api from '../api/axios'
import  Editor  from "@monaco-editor/react"
import type { editor } from "monaco-editor"

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

    const [result, setResult] = useState<string | null>(null)

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

    const {slug} = useParams();

    useEffect(()=>{
        const fetchProblemDetail = async ()=>{
            const apiResponse = await api.get(`/problems/${slug}`, )
            setProblemDetail(apiResponse.data)
        }
        fetchProblemDetail()
    },[slug])

    const handleMount = (editor:editor.IStandaloneCodeEditor | null)=>{
        editorRef.current = editor
    } 

    const handleSubmit = async()=>{
        try{
            if(!problemDetail) return;
            if(!editorRef.current) return ;

            const code = editorRef.current.getValue();
            const req = await api.post('/submissions', {problemId: problemDetail.id, code})
            setResult(req.data.status)
        }
        
        catch{
            setResult("Login to submit")
        }

    }

    if (!problemDetail) return <div>Loading...</div>
    return(
        <div>
            <h1>Problem Detail Page</h1>
            <p>{problemDetail.title}</p>
            <p>{problemDetail.difficulty}</p>
            <p>{problemDetail.description}</p>
            <p>{problemDetail.tags}</p>
            <Editor 
                height="400px"
                language="javascript"
                defaultValue=""
                onMount={handleMount}
            />
            <button type="submit" onClick={handleSubmit}>Submit Code</button>
            {result && <p>{result}</p>}
        </div>
    )
}

export default ProblemDetail