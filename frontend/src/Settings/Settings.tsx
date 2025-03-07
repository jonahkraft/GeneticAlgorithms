import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import ReactDOM from "react-dom/client";
import cookies from "../cookies.ts";
import { useState } from "react";
import "./Settings.css";

function ToggleButton({ label }: { label: string }) {
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive((prev) => !prev);

    return (
        <div className="toggle-container">
            <button onClick={toggle} className={`toggle-btn ${isActive ? "active" : ""}`}>
                {isActive ? "On" : "Off"}
            </button>
            <span>{label}</span>
        </div>
    );
}

function AccountButton() {
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [data, setData] = useState({ username: "", role: "", email: "" });

    const toggleTextVisibility = () => {
        setIsTextVisible((prev) => !prev);
        const cookiesData = cookies.getCookies();
        setData({ ...cookiesData, email: cookiesData.email || "Not provided" }); 
        console.log(cookiesData);
    };

    return (
        <div className="account-container">
            <button onClick={toggleTextVisibility} className="account-btn">
                Account Information
            </button>

            {isTextVisible && (
                <div className="account-info">
                    <p><b>Username:</b> {data.username}</p>
                    <p><b>Role:</b> {data.role}</p>
                    <p><b>Email:</b> {data.email}</p>
                </div>
            )}
        </div>
    );
}

function Settings() {
    return (
        <>
            <Header />
            <div className="settings-container">
                <div className="leftbox">
                    <nav>
                        <a className="active">Account</a>
                        <a>Color Filter</a>
                        <a>Easy Speech</a>
                        <a>Language</a>
                    </nav>
                </div>
                <div className="rightbox">
                    <h1>Settings</h1>

                    <h2>Account</h2>
                    <AccountButton />
                    <p>Change Password</p>

                    <h2>Color Filter</h2>
                    <ToggleButton label="Enable color filter" />

                    <h2>Easy Speech</h2>
                    <ToggleButton label="Enable easy speech mode" />

                    <h2>Language</h2>
                    <ToggleButton label="Switch to English/German" />

                    <p>Datenschutz?</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root_settings")!).render(<Settings />);
