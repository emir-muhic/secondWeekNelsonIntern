import { useRouter } from 'next/router'
import { useUserAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useUserAuth()
    const router = useRouter()

    // Checking if the user is logged in
    if(user === null){
        router.push('/')
    } else {
        return (
            <>
                <div className="text-3xl mt-4 text-center">Welcome to your dashboard. <br /> <span className='text-lg'>Email: {user.email}</span></div>
            </>
        )
    }
}

export default Dashboard