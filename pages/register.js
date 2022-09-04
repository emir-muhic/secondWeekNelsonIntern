import { useState } from "react";
import { useUserAuth } from  "../context/AuthContext";
import { useRouter } from 'next/router'
import Link from "next/link";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { signUp } = useUserAuth()
    const router = useRouter()

    // Register function
    const RegisterHandler = async (e) => {
        e.preventDefault()
        setError('')
        try{
            await signUp(email, password)
            router.push('/dashboard')
        } catch (err) {
            setError(err.message)
        }

    }

    return (
        <>
        <div className="text-center mt-24">
            <div className="flex items-center justify-center">
                <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
            </div>
            <h2 className="text-4xl tracking-tight">
                Register your account
            </h2>
            <span className="text-sm">or <Link href="/signin"><div className="text-blue-500"> 
                login to your account</div>
            </Link>
        </span>
        </div>
        <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap -mx-3 mb-6">
                {error && <div className="w-4/5 border-2 py-1 px-3 mx-auto mb-4 border-red-600 text-red-600">
                    Error: {error}
                </div>}
                <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='email'  required />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                    <button onClick={(e) => RegisterHandler(e)} className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500">Register</button>
                </div>
            </div>
        </form>
   </div>
   </>
    )
}

export default Register