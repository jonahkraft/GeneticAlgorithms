import './Login.css';
import Header from "../Header/Header.tsx";
import { useState } from 'react';
import cookies from '../cookies.ts'
import displayWarning from "./displayWarninig.tsx";
import WarningComponent from "./warning.tsx";
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('')
    const [displaysWarning, setDisplaysWarning] = useState(false);

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
        console.log(displaysWarning)
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

    return (
        <>
            <Header />
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={getUserdata}>
                    <div className="input-container">
                        <input
                            id="username"
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(event) => onTextInput(event)}
                            placeholder=" "
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-container">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(event) => onPasswordInput(event)}
                            placeholder=" "
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <WarningComponent text={text}/>

                    <div className="pass">Forget Password?</div>

                    <button className="button" type="submit" onClick={_ => logIn(username)}>Login</button>
                    <p><br/></p>
                    <div className="signup_link" onClick={_ => logIn("placeholder")}>
                        Continue as Simulator
                    </div>
                </form>
            </div>
        </>
    );
}

function logIn(username: string) {

    axios.post("/api/login", {
        "username": username,
        "password": "password" //TO DO: Passwort Variable einsetzen
    })

        /*

        {headers:{
            "Content-Type": "application/json",
            //"Authorization": "Bearer ??"
        }}
    )*/
        .then((response) => {
            console.log("SOMETHING HAPPENED!!") //TODO: Weiterleiten auf Datenvisualisierung (angemeldet!)
        }).catch((error) => {
            console.log("FEHLER")
        if (error.status === 401){
            console.log("Passwort oder Name falsch!") //TODO: Fehlermeldung auf der Website anzeigen
        }
        })
    //TODO: Register Button? Theoretisch einfach mit Backend zu koppeln
    
    let role

    if (username === "admin") { // Damit man Admin Ansicht sieht(Präsi)
        // TODO: Nur für die Präsentation!!()
        role = "admin"
    }

    else if (username !== "placeholder") { //Backendverbindung--> welche User sind erlaubt
        // dann wurde es über login aufgerufen
        // TODO: sollte callUser aufrufen und davon die Rolle des Benutzers erhalten
        // dafür zusätzlich password als Argument nehmen //Backendverbindung--> Vergleiche ob User richtiges Passwort eingegeben hat
        role = "placeholder_role" //Backendverbindung--> Welche rolle ist dem Nutzer zugewiesen

        // TODO: Fehlermeldung, wenn Name oder Passwort falsch ---> Backendverbindung // Kinda schon da, nur screen nocj nichz
        // Funktion triggerWarning dafür nutzen

    }
    else {
        // dann wurde es über "continue as simulator" aufgerufen
        role = "simulator"
    }

    cookies.saveCookies({"username": username, "role": role, "signed_in": true}) //TODO Herausfinden wie wir mit Cookies umgehen, vorallem nach schließem
    // window.location.reload()
    // window.location.href = "../../visualization.html"
}

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