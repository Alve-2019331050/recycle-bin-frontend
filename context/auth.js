import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();



const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        user:null,
        token:'',
    });

    useEffect(() => {
        const data = window.localStorage.getItem('auth');
        if(data){
            const parsedData =  JSON.parse(data);
            setAuth({
                ...auth,
                user:parsedData.user,
                token:parsedData.token
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = ()=> useContext(AuthContext);

export { AuthProvider, useAuth };

