import { useState } from "react"

export default function Authentication (){
    const [ isRegistration, setIsRegistration ] = useState(false);
    const[ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    

    async function handleAuthenticate() {
        if(!email || !email.includes('@') || !password || password.length < 8 ) {

        }
    }

    return (
        <>
        <h2 className="sign-up-text"> {isRegistration ? 'Sign Up' : 'Login' } </h2>
        <p>
            {isRegistration ? ' Create an Account! ' : ' Sign In to your Account! '} 
        </p>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
        <input  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="********" type="password" />
        <button onClick={handleAuthenticate}><p>Submit</p></button>
        <hr />
        <div className="register-content">
        <p> 
        {isRegistration ? 'Already have an Account? ' : 'Don/´t have an Account? ' }
        </p>
        
        <button onClick={() => {setIsRegistration(!isRegistration)}}>
            <p>{isRegistration ? 'Sign In' : 'Sign Up' } </p>
        </button>
        </div>
        </>
    )


}