import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import ReactDOM from "react-dom/client";
import { useState } from 'react';
import AccountButton from "./AccountButton.tsx";
import "./Settings.css";


function Settings() {
    const [selectedTab, setSelectedTab] = useState<string>("account");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <>
            <Header />
            <div className="settings-page">
                <div className="settings-container">
                    <div className="leftbox">
                        <div id="logo">
                            <h1 className="logo">Settings</h1>
                        </div>
                        <nav>
                            <a className={selectedTab === "account" ? "active" : ""} onClick={() => handleTabClick("account")}>
                                <i className="fa fa-user"></i> Account
                            </a>
                            <a className={selectedTab === "color" ? "active" : ""} onClick={() => handleTabClick("color")}>
                                <i className="fa fa-palette"></i> Color Filter
                            </a>
                            <a className={selectedTab === "speech" ? "active" : ""} onClick={() => handleTabClick("speech")}>
                                <i className="fa fa-volume-up"></i> Easy Speech
                            </a>
                            <a className={selectedTab === "language" ? "active" : ""} onClick={() => handleTabClick("language")}>
                                <i className="fa fa-language"></i> Language
                            </a>
                        </nav>
                        <div className="language-switch">
                            <button className="language-btn">ENG</button>
                            <button className="language-btn">DE</button>
                        </div>

                    </div>

                    <div className="rightbox">
                        {selectedTab === "account" && (
                            <>
                                <AccountButton />
                                <p>Change Password</p>
                            </>
                        )}

                        {selectedTab === "color" && (
                            <>
                                <h2>Color Filter</h2>
                                <p>Enable/Disable color filter</p>
                            </>
                        )}

                        {selectedTab === "speech" && (
                            <>
                                <h2>Easy Speech</h2>
                                <p>Enable/Disable speech mode</p>
                            </>
                        )}

                        {selectedTab === "language" && (
                            <>
                                <h2>Language</h2>
                                <p>Switch between English and German</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root_settings")!).render(<Settings />);
