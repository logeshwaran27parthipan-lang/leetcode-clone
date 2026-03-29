<div className="bg-gray-900 min-h-screen text-white p-6">

    <h1 className="text-3xl font-bold mb-6">Problems</h1>

    <div className="grid gap-4">

        {problems.map((prob) => (
            <Link 
                key={prob.id}
                to={`/problems/${prob.slug}`}
                className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition flex justify-between items-center"
            >
                <span>{prob.title}</span>

                <span className={
                    prob.difficulty === "Easy" ? "text-green-400" :
                    prob.difficulty === "Medium" ? "text-yellow-400" :
                    "text-red-400"
                }>
                    {prob.difficulty}
                </span>
            </Link>
        ))}

    </div>

</div>