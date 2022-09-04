import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { db } from "../firebase";

export async function getServerSideProps() {

    // Retrieving data from the database
    const q = query(collection(db, "todos"));
    const querySnapshot = await getDocs(q);
    const numberOfTodos = querySnapshot.size

    const q2 = query(collection(db, "todos"), where("done", "==", true));
    const querySnapshot2 = await getDocs(q2);
    const numberOfCompletedTodos = querySnapshot2.size

    const q3 = query(collection(db, "todos"), where("done", "==", false));
    const querySnapshot3 = await getDocs(q3);
    const numberOfUnCompletedTodos = querySnapshot3.size


    return {
        props: {
            numberOfTodos, numberOfCompletedTodos, numberOfUnCompletedTodos
        }
    }
}

const Profile = ({numberOfTodos, numberOfCompletedTodos, numberOfUnCompletedTodos}) => {
    const { user } = useUserAuth()
    const router = useRouter()

    // Checking if the user is logged in
    useEffect(() => {
        if(user === null){
            router.push('/')
            return
        }
    })

    return (
        <>
            <div className="text-3xl border-b-2 border-black pb-3 p-4">
                My Profile | <span className="text-sm">Your email: {user.email}</span> 
            </div>
            <div className="mt-3 flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
                    <div className="bg-green-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">All todos</h5>
                                <h3 className="text-white text-3xl">{numberOfTodos}<span className="text-green-400"></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
                    <div className="bg-blue-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Completed todos</h5>
                                <h3 className="text-white text-3xl">{numberOfCompletedTodos} <span className="text-blue-400"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
                    <div className="bg-orange-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right pr-1">
                                <h5 className="text-white">Uncompleted todos</h5>
                                <h3 className="text-white text-3xl">{numberOfUnCompletedTodos} <span className="text-orange-400"></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile