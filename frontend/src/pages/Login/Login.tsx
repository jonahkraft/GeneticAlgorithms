import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Warning from "./Warning.tsx";
//import TestlogIn from './LoginExport.ts'
import axios from "axios";
import cookies from "../../cookies.ts";
import GenericButton from "../../components/GenericButton/GenericButton.tsx";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('')
    const [displaysWarning, setDisplaysWarning] = useState(false);
    const navigate = useNavigate();

    function getUserdata(event: any) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        logIn(username, password)
        if (cookies.isLoggedIn()) {
            console.log("Cookies gesetzt")
            navigate("/data_visualization")
        }
        else {
            triggerWarning()
        }
    }

    function triggerWarning() {
        setText("username or password is wrong.")
        setDisplaysWarning(true)
    }

    function disableWarning() {
        setText("")
        setDisplaysWarning(false)
    }

    function onTextInput(event: any) {
        setUsername(event.target.value)
        if (displaysWarning) {
            disableWarning()
        }
    }

    function onPasswordInput(event: any) {
        setPassword(event.target.value)
        if (displaysWarning) {
            disableWarning()
        }
    }

    // change ggf
    function enter(username: string) {
        console.log(username)
        //navigate("/data_visualization")
    }

    return (
        <>
            <div className={styles.container}>
            <div className={styles.center}>
                <h1 className={styles.header}>Login</h1>
                <form onSubmit={getUserdata}>
                    <div className={styles.inputContainer}>
                        <input className={styles.input}
                            id="username"
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(event) => onTextInput(event)}
                            placeholder=" "
                        />
                        <label htmlFor="username" className={styles.label}>Username</label>
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.input}
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(event) => onPasswordInput(event)}
                            placeholder=" "
                        />
                        <label className={styles.label} htmlFor="password">Password</label>
                    </div>

                    <Warning text={text}/>

                    <div className={styles.pass}>Forgot Password?</div>

                    <GenericButton title = "Login" onClick={() => enter(username)}></GenericButton>
                    <p><br/></p>
                    <div className={styles.signupLink}>
                        Continue as Simulator
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}

// Check for User
function logIn(username: string, password: string) {

    console.log("username in logIN", username)
    console.log("passwird in lOGIN", password)
    //const token = ''
    axios.post('/api/login',
        { "username": username, "password": password },
        { headers: { "Content-Type": "application/json" } }
    )
         .then(response => {
             const token = response.data.access_token
             const role = response.data.role
             cookies.saveCookies({"username": username, "role": role, "signed_in": true, "token": token})
             console.log("erfolg")
             /*
             axios.post('/api/protected_test', {},
                 {
                     headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json"  // Ensure JSON data format
                     }
                 }
             )
              */
         })
         .catch(error => {
             console.error(error);
         });
}

export default Login;