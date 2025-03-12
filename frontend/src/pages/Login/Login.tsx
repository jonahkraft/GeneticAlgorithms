import styles from './Login.module.css';
import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import cookies from '../cookies.ts'
import displayWarning from "./displayWarninig.ts";
import WarningComponent from "./warning.tsx";
//import TestlogIn from './LoginExport.ts'
import axios from "axios";
import cookies from "../../cookies.ts";
//import cookies from "../../cookies.ts";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('')
    const [displaysWarning, setDisplaysWarning] = useState(false);
    //const navigate = useNavigate();

    function getUserdata(event: any) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password")
        console.log("Username:", username, "Password:", password);
        logIn(
            username, password)
    }

    // function triggerWarning() {
    //     displayWarning(setText, "username or password is wrong")
    //     setDisplaysWarning(true)
    // }

    function disableWarning() {
        displayWarning(setText, "")
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

    /*
    function enter(username: string) {
        //TestlogIn(username);
        //navigate("/data_visualization")
    }

     */


    return (
        <>
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

                    <WarningComponent text={text}/>

                    <div className={styles.pass}>Forget Password?</div>

                    <button className={styles.button} type="submit">Login</button>
                    <p><br/></p>
                    <div className={styles.signupLink}>
                        Continue as Simulator
                    </div>
                </form>
            </div>
        </>
    );
}

// Check for User
export function logIn(username: string | File | null, password: string | File | null) {
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
             console.log('Token', token)
             console.log('Role', response.data.role)
             cookies.saveCookies({"username": username, "role": role, "signed_in": true})
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
    //cookies.saveCookies({"username": username, "role": role, "signed_in": true})
}

export default Login;