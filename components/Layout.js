import { UserAuthContextProvider } from '../context/AuthContext'
import Header from '/components/Header.js'

const Layout = (props) => {
    const { children } = props
    return (
        <>
            <UserAuthContextProvider>
                <Header />
                {children}
            </UserAuthContextProvider>
        </>
    )
}

export default Layout