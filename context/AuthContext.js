import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }){
const [user, setUser] = useState('')
const [loading, setLoading] = useState(true)

  function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }
  function logOut() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser => {
      setUser(currentUser)
      setLoading(false)
    }))
    return () => {
      unsubscribed()
    }
    
  }, [])
  

  return <userAuthContext.Provider value={{user, signUp, signIn, logOut}}>{!loading && children}</userAuthContext.Provider>
}

export function useUserAuth() {
  return useContext(userAuthContext)
}