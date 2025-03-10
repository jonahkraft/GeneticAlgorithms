import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { useState } from 'react';
import AccountButton from "../AccountButton/AccountButton.tsx";
import styles from "./Settings.module.css";
import cookies from "../cookies.ts";


function Settings() {
    const [selectedTab, setSelectedTab] = useState<string>("account");
    const role: string = cookies.getCookies()["role"];

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    // TODO: Nutzer aus Datenbank laden für Admin-Funktionen

    return (
        <div>
            <Header />
            <div className={styles.settingsPage}>
                <div className={styles.settingsContainer}>
                    <div className={styles.leftbox}>

                        <h1 className={styles.header}>Settings</h1>

                        <nav className={styles.navigation}>
                            <a className={selectedTab === "account" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("account")}>
                                Account
                            </a>
                            <a className={selectedTab === "color" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("color")}>
                                Color Filter
                            </a>
                            <a className={selectedTab === "speech" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("speech")}>
                                Easy Speech
                            </a>
                            <a className={selectedTab === "language" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("language")}>
                                Language
                            </a>

                            {/* Nutzerverwaltung: Nur für Admins verfügbar */}
                            {role === "admin" && (
                                <a className={selectedTab === "user-management" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("user-management")}>
                                    User Management
                                </a>
                            )}
                        </nav>

                        <div className={styles.languageSwitch}>
                            <button className={styles.languageButton}>ENG</button>
                            <button className={styles.languageButton}>DE</button>
                        </div>
                    </div>

                    <div className={styles.rightbox}>
                        {selectedTab === "account" && (
                            <>
                                <AccountButton />
                                <p className={styles.settingsText}>Change Password</p>
                            </>
                        )}

                        {selectedTab === "color" && (
                            <>
                                <h2 className={styles.header}>Color Filter</h2>
                                <p className={styles.settingsText}>Enable/Disable color filter</p>
                            </>
                        )}

                        {selectedTab === "speech" && (
                            <>
                                <h2 className={styles.header}>Easy Speech</h2>
                                <p className={styles.settingsText}>Enable/Disable speech mode</p>
                            </>
                        )}

                        {selectedTab === "language" && (
                            <>
                                <h2 className={styles.header}>Language</h2>
                                <p className={styles.settingsText}>Switch between English and German</p>
                            </>
                        )}

                        {selectedTab === "user-management" && role === "admin" && (
                            <>
                                <h2 className={styles.header}>User Management</h2>
                                <p className={styles.settingsText}>Manage system users and their roles. You can add, edit, or delete users.</p>

                                {/* Eingabemaske zum Hinzufügen eines neuen Benutzers, derzeit ohne Funktionalität */}
                                <div>
                                    <h3 className={styles.header}>Add New User</h3>
                                    <form>
                                        <input className={styles.userFormInput} type="text" placeholder="Enter username" required />
                                        <input className={styles.userFormInput} type="password" placeholder="Enter password" required />

                                        <select className={styles.userFormSelect} required>
                                            <option value="simulator">Simulator</option>
                                            <option value="data-analyst">Data Analyst</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        <button type="submit" className={styles.userFormButton}>Add User</button>
                                    </form>
                                </div>

                                {/* Benutzerliste zum Bearbeiten und Löschen von Nutzern */}
                                <div className={styles.userList}>
                                    <h3 className={styles.header}>Existing Users</h3>
                                    <table className={styles.table}>
                                        <thead>
                                        <tr>
                                            <th className={styles.th}>Username</th>
                                            <th className={styles.th}>Password</th>
                                            <th className={styles.th}>Role</th>
                                            <th className={styles.th}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {/* Daten derzeit hardgecoded, anpassen! */}

                                        <tr>
                                            <td className={styles.td}>John Doe</td>
                                            <td className={styles.td}>**********</td>
                                            <td className={styles.td}>Admin</td>
                                            <td className={styles.td}>
                                                <button className={styles.userListButton}>Edit</button>
                                                <button className={styles.userListButton}>Delete</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className={styles.td}>Jane Smith</td>
                                            <td className={styles.td}>**********</td>
                                            <td className={styles.td}>Data Analyst</td>
                                            <td className={styles.td}>
                                                <button className={styles.userListButton}>Edit</button>
                                                <button className={styles.userListButton}>Delete</button>
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
        </div>
    );
}

export default Settings;