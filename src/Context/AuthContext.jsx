import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase';
import  {useState, useEffect, useContext, createContext} from 'react';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider(props){
    const {children} = props;
    const [globaUser,setGlobalUser] = useState(null);
    const  [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)

    }
    function login(email,password){
        return signInWithEmailAndPassword(auth, email,password)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth,email)
    }

    function logout(){
        setUser(null);
        setGlobalData(null);
        return signOut(auth);
    }

    const value = {globaUser , globalData, setGlobalData, isLoading, signup, login, logout}; 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => { 
            
            if(!user) {
                console.log('No Active user');
                return
            }


            try {
                setIsLoading(true)
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef) 

                let firebaseData = {}
                if(docSnap.exist()){
                    console.log('Found user data');
                    firebaseData = docSnap.data();
                }
                setGlobalData(firebaseData)
            } catch (err) {
                console.log(err.message)
            } finally{
                setIsLoading(false)
            } 
    
    

        } )

        return unsubscribe
    }, [])
    
    return(
        <AuthContext.Provider value={value}>
            {children} 
        </AuthContext.Provider>
    );
}






