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
            if(!problemDetail) return
            if(!editorRef.current) return ;

            const code = editorRef.current.getValue();
            const req = await api.post('/submissions', {problemId: problemDetail.id, code})
            setResult(req.data.status)
        }
        
        catch{
            setResult("Login to submit")
        }

    }
    const card="bg-gray-800 border rounded-xl border-orange-900 px-3 py-3 hover:bg-gray-700 transition duration-200  gap-6 space-x-2"

    const resultCard = "col-span-2 bg-gray-800 block  font-bold text-center  border rounded-xl px-3 py-2  gap-6 "

    if (!problemDetail) return (
                  <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>
            );
    return(  
        <div className="pt-20 bg-gray-900 min-h-screen p-6 text-white space-y-3 grid gap-4 grid-cols-[1fr_3fr]">
           
            <div  className="bg-gray-800 
                    border rounded-xl border-orange-900 p-4
                    hover:bg-gray-700 transform hover:scale-103 shadow-md hover:shadow-xl transition duration-200 
                    flex flex-col gap-6">

                <h1 className="text-3xl font-bold border-b-2 border-orange-400 py-1 ">Problem Detail 🚀</h1>
                <p className={card}>{problemDetail.title}</p>

                <p className={`${card} ${
                    problemDetail.difficulty === "EASY" ? "bg-green-500/20 text-green-400 border-green-700" :
                    problemDetail.difficulty === "MEDIUM" ? "bg-yellow-500/30 text-yellow-400 border-yellow-700" : "bg-red-500/20 text-red-400 border-red-700"}`}   
                >{problemDetail.difficulty}</p>

                <p className={card }>{problemDetail.description}</p>
                <p className={card}>{
                    problemDetail.tags.map((tag,index)=>(
                        <span
                            className="bg-orange-400 px-2 py-1 inline-fit text-sm border rounded-tl-2xl rounded-br-2xl p-1 "
                            key={index}>{tag}</span>
                    ))
                    }</p>

            </div>
            <div 
             className="bg-gray-800 
                    border rounded-xl border-orange-900 p-4
                    hover:bg-gray-700 transform hover:scale-103 shadow-md hover:shadow-xl transition duration-200 
                    flex flex-col gap-6">
            <Editor 
                className="border-8  border-orange-400 rounded-xl"
                height="400px"
                language="javascript"
                defaultValue=""
                onMount={handleMount}
            />
            <button 
            className="bg-orange-500 px-2 py-2 rounded-lg hover:bg-orange-600 shadow-lg transition inline-block "
            type="submit" onClick={handleSubmit}>Submit Code</button>
            </div>
            {result && <p
                className={`${resultCard}
                ${result==="ACCEPTED"? "text-green-500 border-green-500 bg-green-900 ":"text-red-500 border-red-500 bg-red-600"}`
            }
            >{result} </p>}
            
        </div>

    )
}

export default ProblemDetail