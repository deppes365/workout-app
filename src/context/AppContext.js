import { createContext, useState } from "react";
import app from '../firebase.config'
import { getAuth, signOut } from "firebase/auth";

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [menuActive, setMenuActive] = useState(false)
    const [activeLink, setActiveLink] = useState('/')

    const signOutUser = async () => {
        try {
            const auth = getAuth(app)
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }
    

    const values = {
        loggedIn,
        setLoggedIn,
        menuActive,
        setMenuActive,
        activeLink, 
        setActiveLink,
        signOutUser
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext