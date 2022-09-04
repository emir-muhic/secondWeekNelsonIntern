import { collection, query, onSnapshot, orderBy, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { db } from "../firebase";   

const MyTodos = () => {
    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    const [todo, setTodo] = useState('')
    const [changed, setChanged] = useState(false)
    const [error, seterror] = useState('')
    const [adding, setAdding] = useState(false)

    const { user } = useUserAuth() 
    const router = useRouter()

    // Checking if the user is logged in
    useEffect(() => {
        if(user === null){
            router.push('/')
            return
        }
    })

    // Adding todo in database
    const addTodo = async (e) => {
        e.preventDefault()

        setAdding(true)
        seterror('')

        if(!todo){
            seterror('The field is empty!!!')
            setAdding(false)
            return
        }

        const docRef = await addDoc(collection(db, "todos"), {
            author: user.email,
            todo: todo,
            done: false,
            created: new Date()
        });

        setChanged(current => !current)
        setAdding(false)
    }

    // Getting data from database
    useEffect(() => {
        setMyData([])
        const qu = query(collection(db, "todos"), orderBy("created", "desc"));
        const myTodo = [];
        onSnapshot(qu, (querySnapshot) => {
            querySnapshot.forEach((myDoc) => {
            if(myDoc.data().author === user.email){
                myTodo.push({
                    id: myDoc.id,
                    ...myDoc.data(),
                })

                setLoading(false)
            }
            
        });
            setMyData(myTodo)
            setLoading(false)
        });
        
    
    }, [changed])


    // Finished/unfinished exchanger
    const reverseTodo = async (id, docDone) => {

        await setDoc(doc(db, "todos", id), {
            done: docDone ? false : true
        }, { merge: true })
    
        setChanged(current => !current)

    }

    // Deleting tasks from the list
    const removeTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));

        setChanged(current => !current)
    }


    return (
        <>
            <form className="mt-10 w-3/5 mx-auto">   
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                <div className="relative">
                    <input onChange={(e) => setTodo(e.target.value)} value={todo} type="search" id="search" className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your todo..." autoComplete="off" required />
                    {adding && <button onClick={(e) => addTodo(e)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>Adding...</button>}
                    {!adding && <button onClick={(e) => addTodo(e)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>}
                </div>
            </form>
            <div className="mb-10 flex flex-col gap-4 mt-10 items-center justify-center">

                {loading && <div className="font-bold text-2xl">Loading...</div>}
                {error && <div>{error}</div>}

                {myData.map((doc, index) => (              
                <div className="rounded-sm w-1/2 grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg" key={index}>
                    <div onClick={(e) => reverseTodo(doc.id, doc.done)} className="col-span-12 md:col-span-1 cursor-pointer">
                        {!doc.done && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="#2563eb" viewBox="0 0 448 512"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>}
                        {doc.done && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="#2563eb" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>}
                    </div>
                    <div className="col-span-11 xl:-ml-5">
                        {!doc.done && <><p className="flex justify-between text-blue-600 font-semibold"><span>{doc.todo}</span> <span onClick={() => removeTodo(doc.id)} className="cursor-pointer text-red-600">Delete</span> </p></>}
                        {doc.done && <><p className="flex justify-between text-blue-600 font-semibold"><span className="line-through">{doc.todo}</span> <span onClick={() => removeTodo(doc.id)} className="cursor-pointer text-red-600">Delete</span> </p></>}
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

export default MyTodos