import { collection, query, onSnapshot, startAt, endAt, orderBy, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const Todos = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    // Retrieving data from the database
    const q = query(collection(db, "todos"), orderBy("todo"), startAt(search), endAt(search + '\uf8ff'));
    const todos = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //todos.push(doc.data());
        todos.push({
            id: doc.id,
            ...doc.data(),
        })
        setLoading(false)
    });
     setData(todos)
    });

    return (
        <>
            <form className="w-3/5 mx-auto mt-10">   
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="search" id="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" autoComplete="off" required />
                </div>
            </form>
            <div className="mb-10 flex flex-col gap-4 mt-10 items-center justify-center">

                {loading && <div className="font-bold text-2xl">Loading...</div>}

                {data.map((doc) => (
                <div className="rounded-sm w-1/2 grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform" key={doc.id}>
                    <div className="col-span-12 md:col-span-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#2563eb">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                    </div>
                    <div className="col-span-11 xl:-ml-5">
                        {doc.done && <p className="text-blue-600 font-semibold line-through">{doc.todo} </p>}
                        {!doc.done && <p className="text-blue-600 font-semibold">{doc.todo} </p>}
                    </div>
                    <div className="md:col-start-2 col-span-11 xl:-ml-5">
                        <p className="text-sm text-gray-800 font-light"> Author: {doc.author} </p>
                    </div>
                </div>
                ))}
    
            </div>
        </>
    )
}

export default Todos