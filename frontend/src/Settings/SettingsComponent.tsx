import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { useState } from 'react';
import AccountButton from "./AccountButton.tsx";
import "./Settings.css";
import cookies from "../cookies.ts";


function Settings() {
    const [selectedTab, setSelectedTab] = useState<string>("account");
    const role: string = cookies.getCookies()["role"];

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    // TODO: Nutzer aus Datenbank laden für Admin-Funktionen
    // Potentielle Backendverbindung?
    return (
        <>
            <Header/>
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

                            {/* Nutzerverwaltung: Nur für Admins verfügbar */}
                            {role === "admin" && (
                                <a className={selectedTab === "user-management" ? "active" : ""} onClick={() => handleTabClick("user-management")}>
                                    <i className="fa fa-users"></i> User Management
                                </a>
                            )}
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

                        {selectedTab === "user-management" && role === "admin" && (
                            <>
                                <h2>User Management</h2>
                                <p>Manage system users and their roles. You can add, edit, or delete users.</p>

                                {/* Eingabemaske zum Hinzufügen eines neuen Benutzers, derzeit ohne Funktionalität */}
                                <div className="user-form">
                                    <h3>Add New User</h3>
                                    <form>

                                        <div className="form-group">
                                            <label htmlFor="username">Username:</label>
                                            <input type="text" id="username" placeholder="Enter username" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password:</label>
                                            <input type="password" id="password" placeholder="Enter password" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="role">Role:</label>
                                            <select id="role" required>
                                                <option value="simulator">Simulator</option>
                                                <option value="data-analyst">Data Analyst</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        <button type="submit">Add User</button>
                                    </form>
                                </div>

                                {/* Benutzerliste zum Bearbeiten und Löschen von Nutzern */}
                                <div className="user-list">
                                    <h3>Existing Users</h3>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {/* Daten derzeit hardgecoded, anpassen! */}

                                        <tr>
                                            <td>John Doe</td>
                                            <td>**********</td>
                                            <td>Admin</td>
                                            <td>
                                                <button>Edit</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Jane Smith</td>
                                            <td>**********</td>
                                            <td>Data Analyst</td>
                                            <td>
                                                <button>Edit</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Settings;