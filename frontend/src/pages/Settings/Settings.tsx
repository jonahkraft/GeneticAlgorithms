import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import cookies from "../../cookies.ts";
import DarkModeButton from "../../components/DarkModeButton/DarkModeButton.tsx"
import ToggleButton from "../../components/ToggleButton/ToggleButton.tsx";
import axios from "axios";

function Settings() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.isLoggedIn()) {
            navigate("/login");
        }
    }, [navigate]);

    const [selectedTab, setSelectedTab] = useState<string>("account");
    const role: string = cookies.getCookies().role;
    const name: string | boolean = cookies.getCookies().username;
    const [isPopupVisible,setPopupVisible] = useState(false);
    const togglePopup =() =>{
        setPopupVisible(!isPopupVisible);
    }
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    // TODO: Nutzer aus Datenbank laden für Admin-Funktionen

    return (
        <div className={styles.settingsPage}>
            <div className={styles.settingsContainer}>
                <div className={styles.leftbox}>

                    <h1 className={styles.header}>Settings</h1>

                    <nav className={styles.navigation}>
                        <a className={selectedTab === "account" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("account")}>
                            Account
                        </a>
                        <a className={selectedTab === "color" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("color")}>
                            Appearance
                        </a>
                        <a className={selectedTab === "speech" ? styles.navigationLinkActive : styles.navigationLinkInactive} onClick={() => handleTabClick("speech")}>
                            Accesibility

                        </a>


                        {/* Nutzerverwaltung: Nur für Admins verfügbar */}
                        {role === "administrator" && (
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
                            <span className={styles.settingsText}>username: {name}</span>
                            <span className={styles.settingsText}>role: {role}</span>
                            <button onClick={togglePopup} className = {styles.accountbutton}>Change Password</button> {/*TODO Funktion implementieren und schöner*/}
                                                                                   {isPopupVisible && (
                                                                                       <div>
                                                                                           <p style={{ color: "black" }}>Enter your old Password:</p>
                                                                                           <input className={styles.passwordinput}
                                                                                               type="password"
                                                                                               //value={oldPassword}
                                                                                               //nChange={handleOldPasswordChange}
                                                                                               placeholder="Old Password"
                                                                                           />
                                                                                           <p style={{ color: "black" }}>Enter your new Password:</p>
                                                                                           <input className={styles.passwordinput}
                                                                                               type="password"
                                                                                               //value={oldPassword}
                                                                                               //onChange={handleOldPasswordChange}
                                                                                               placeholder="New Password"
                                                                                           />
                                                                                           <p style={{ color: "black" }}>Enter your new Password again:</p>
                                                                                           <input className={styles.passwordinput}
                                                                                               type="password"
                                                                                               //value={oldPassword}
                                                                                               //onChange={handleOldPasswordChange}
                                                                                               placeholder="New Password"
                                                                                           />
                                                                                       </div>
                                                                                   )}
                            <button className = {styles.accountbutton}>Delete Account </button> {/*TODO implizierter logout/aus Datenbank löschen und schöner machen*/}
                        </>

                    )}

                    {selectedTab === "color" && (
                        <>
                            <h2 className={styles.header}>Appearance</h2>
                            <p className={styles.settingsText}> Switch to dark mode <DarkModeButton /> </p>
                        </>
                    )}

                    {selectedTab === "speech" && (
                        <>
                            <h2 className={styles.header}>Easy Speech</h2>
                            <ToggleButton></ToggleButton>

                        </>
                    )}


                    {selectedTab === "user-management" && role === "administrator" && (
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
                                        <option value="administrator">Admin</option>
                                    </select>

                                    <button type="submit" className={styles.userFormButton} onClick={() => addUser()}>Add User</button>
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
    );
}

function addUser(username: string | File | null, password: string | File | null, role: string | File | null) {
    console.log("username in logIN", username)
    console.log("passwird in lOGIN", password)
    //const token = ''
    axios.post('/api/register',
        { "username": username, "password": password, "role": role },
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
}

export default Settings;