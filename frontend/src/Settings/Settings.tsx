import Header from "../Header/Header.tsx"
import Footer from "../Footer/Footer.tsx"
import ReactDOM from 'react-dom/client';
import cookies from "../cookies.ts";
import { useState } from "react";

function ToggleFilter() { {/*Togglesystem für den Filter*/}
    const [isActive, setIsActive] = useState(false);
    const toggle = () => {
        setIsActive((prev) => !prev);
    };
    return (
        <div>
            <button onClick={toggle} className="px-4 py-2 bg-gray-300 rounded">
                {isActive ? "On" : "Off"}
            </button>
            {isActive && <p>The toggle is ON!</p>} {/*Connection zu wirklichem Filter fehlt noch*/}
        </div>
    );
}
function ToggleSpeech() { {/*Togglesystem für den Spracheinstellung-> theoretischer Plan: Nach togglen ist all der text ein leichten Sätzen geschrieben.*/}
    const [isActive, setIsActive] = useState(false);
    const toggle = () => {
        setIsActive((prev) => !prev);
    };
    return (
        <div>
            <button onClick={toggle} className="px-4 py-2 bg-gray-300 rounded">
                {isActive ? "On" : "Off"}
            </button>
            {isActive && <p>The toggle is ON!</p>} {/*wie genau kann man das machen?*/}
        </div>
    );
}
function AccountButton() {
    {/*Accountinformationen aufrufen: (mögliche addition Email)*/}
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [data, setData] = useState({ username: '', role: '' });

    const toggleTextVisibility = () => {
        setIsTextVisible((prev) => !prev);
        const cookiesData = cookies.getCookies(); // Hier solltest du die Cookies korrekt lesen
        setData(cookiesData); // Die Cookie-Daten setzen (nur ein Beispiel)
        console.log(cookiesData); // Ausgabe der Cookie-Daten zum Debuggen
    };
    return (
        <div>
            <button onClick={toggleTextVisibility} className="px-4 py-2 bg-gray-300 rounded">
                Account Information
            </button>

            {isTextVisible && (
                <div>
                    <br/>
                    <p><b>Username:</b> {data.username}</p>
                    <p><b>Role:</b> {data.role}</p>
                    <br/>
                    <p>Email:</p>
                </div>
            )}
        </div>
    );
}
function LanguageButton() {
    const [isActive, setIsActive] = useState(false);
    const toggle: ()=>void = (): void => {
        setIsActive((prev) => !prev);
    };
    return (
        <div>
            <button onClick={toggle} className="px-4 py-2 bg-gray-300 rounded">
                {isActive ? "English" : "Deutsch"}</button>
        </div>
    );
}

// props sollte ein user-Objekt sein

function Settings() {

    const data = cookies.getCookies()
    console.log(data)
    return(
        <>
            <Header/>
            <h1>Settings</h1>
            <h2>Account</h2>
            <AccountButton/>
            <p>Change Password</p>
            <p>...</p>
            <h2>color filter</h2>
            <ToggleFilter /> {/*Möglichkeit den Farbfilter an und auszuschalten*/}
            <h2>easy speech</h2>
            <ToggleSpeech /> {/* Togglen der einfachen Sprache*/}
            <h2>language</h2>
            <LanguageButton/> {}
            <p>Datenschutz?</p>
            <Footer/>


        </>

    )
}

ReactDOM.createRoot(document.getElementById('root_settings')!).render(<Settings />);

