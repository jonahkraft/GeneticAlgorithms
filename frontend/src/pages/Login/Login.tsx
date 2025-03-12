import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import cookies from '../cookies.ts'
import displayWarning from "./displayWarninig.ts";
import WarningComponent from "./warning.tsx";
import logIn from './LoginExport.ts'
import Header from "../../components/Header/Header.tsx";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('')
    const [displaysWarning, setDisplaysWarning] = useState(false);
    const navigate = useNavigate();

    function getUserdata(event: any) {
        event.preventDefault();
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

    function enter(username: string) {
        logIn(username);
        navigate("/data_visualization")
    }

    return (
        <>
            <Header/>
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

                    <button className={styles.button} type="submit" onClick={() => enter(username)}>Login</button>
                    <p><br/></p>
                    <div className={styles.signupLink} onClick={() => enter("placeholder")}>
                        Continue as Simulator
                    </div>
                </form>
            </div>
        </>
    );
}

/*
function logIn(username: string) {
    let role = ''

    if (username === "admin") {
        // TODO: Nur für die Präsentation!!
        role = "admin"
    }

    else if (username === "data_analyst"){
        // TODO: Nur für Prototyp
        role = 'data_analyst'
    }

    else if (username !== "placeholder") {
        // dann wurde es über login aufgerufen
        // TODO: sollte callUser aufrufen und davon die Rolle des Benutzers erhalten
        // dafür zusätzlich password als Argument nehmen
        role = "simulator"

        // TODO: Fehlermeldung, wenn Name oder Passwort falsch
        // Funktion triggerWarning dafür nutzen

    }
    else {
        // dann wurde es über "continue as simulator" aufgerufen
        role = "simulator"
    }

    cookies.saveCookies({"username": username, "role": role, "signed_in": true})
    window.location.reload()
    window.location.href = "../../visualization.html"
}

 */

// Check for User
// function callUser(username: string, password: string) {
//     axios.post('/api/login', {"username": username, "password": password })
//         .then(response => {
//             let token = response.data.access_token
//             console.log(token)
//             axios.post('/api/protected_test', {},
//                 {
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "application/json"  // Ensure JSON data format
//                     }
//                 }
//             )
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

export default Login;