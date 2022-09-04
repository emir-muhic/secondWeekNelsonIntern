import { doc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { db } from "../firebase"


const Modal = ({id, todo}) => {
    const [newTodo, setNewTodo] = useState(todo)
    const router = useRouter()

    // Edit todo function
    const editMyTodo = async (e) => {
        e.preventDefault()

        const updateFirebase = async () => {
            const docRef = doc(db, "todos", id);
            await updateDoc(docRef, {
            todo: newTodo
            });
        }
        await updateFirebase()

        router.reload()

    }

    return (
        <>
            <div class="overflow-y-auto overflow-x-hidden fixed overflow-y-auto overflow-x-hidden fixedabsolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 bg-blue-50 w-full h-full mx-auto p-6">
                <div class="w-4/5 mx-auto mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-4 sm:p-7">
                        <div class="text-center">
                        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Edit todo</h1>
                        </div>

                        <div class="mt-5">
                        <form>
                            <div class="grid gap-y-4">
                            <div>
                                <div class="relative">
                                <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} type="text" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required autoComplete="off" />
                                </div>
                            </div>
                            <button onClick={editMyTodo} type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Update todo</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal