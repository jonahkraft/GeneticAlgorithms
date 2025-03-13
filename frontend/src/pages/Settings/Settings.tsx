import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import cookies from "../../cookies.ts";
import DarkModeButton from "../../components/DarkModeButton/DarkModeButton.tsx"
import ToggleButton from "../../components/ToggleButton/ToggleButton.tsx";
import axios from "axios";
import loadUsers from "./load_users.ts"
import {changeUsername, changeUserRole, changePassword} from "./edit_user_functions.ts"

interface UserData {
    role: string;
    username: string;
    password: string;
}

function Settings() {
    const navigate = useNavigate();
    const initialChecked = cookies.getCookies().easy_speech || false;

    useEffect(() => {
        if (!cookies.isLoggedIn()) {
            navigate("/login");
        }
    }, [navigate]);

    const [selectedTab, setSelectedTab] = useState<string>("account");
    const role: string = cookies.getCookies().role;
    const name: string | boolean = cookies.getCookies().username;
    const [isPopupVisible, setPopupVisible] = useState(false);
    const togglePopup =() =>{
        setPopupVisible(!isPopupVisible);
    }
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    // für das Create-User-Fenster
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleSet, setRole] = useState("simulator");

    // für die User Tabelle
    const [users, setUsers] = useState<UserData[]>([]);

    // zum Löschen
    const [userToBeDeleted, SetUserToBeDeleted] = useState("")

    // zum Bearbeiten von Nutzern
    const [oldName, setOldName] = useState("");
    const [newName, setNewName] = useState("");
    const [newPW, setNewPW] = useState("");
    const [newRole, setNewRole] = useState("simulator");

    useEffect(() => {
        if (cookies.getCookies().role === "administrator") {
            loadUsers().then(setUsers);
        }
    }, []);

    function addUser(username: string, password: string, role: string) {
        console.log("username in addUser", username)
        console.log("password in addUser", password)
        console.log("role in addUser", role, typeof(role))
        const token = cookies.getCookies()?.token;
        if (!token) {
            console.error("Token is missing!");
            return;
        }

        //const token = ''
        axios.post('/api/register',
            { "username": username, "password": password, "role": role.trim() },
            { headers: { "Authorization": token ? `Bearer ${token.trim()}` : "", "Content-Type": "application/json" } }
        )
            .then(response => {
                console.log(response)
                setUsers([...users, { username, password: "**********", role }]);

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
                if (error.response) {
                    console.error("Error Status:", error.response.status);
                    console.error("Error Data:", error.response.data);
                    console.error("Error Headers:", error.response.headers);
                } else {
                    console.error("Request failed:", error.message);
                }
            });

    }

    function deleteUser(username: string) {
        console.log("lösche", username)
        const token = cookies.getCookies()?.token;
        if (!token) {
            console.error("Token is missing!");
            return;
        }

        axios.post(
            '/api/delete_user',
            { username },
            { headers: { "Authorization": `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
        )
            .then(response => {
                console.log("User deleted:", response);
                setUsers(users.filter(user => user.username !== username));
            })
            .catch(error => {
                if (error.response) {
                    console.error("Error Status:", error.response.status);
                    console.error("Error Data:", error.response.data);
                } else {
                    console.error("Request failed:", error.message);
                }
            });
    }

    async function editUserAdmin(oldUsername: string, newUsername: string, newPassword: string, newRole: string) {
        const futureName = newUsername !== "" ? newUsername : oldUsername;

        if (newUsername !== "") {
            await changeUsername(oldUsername, newUsername);
        }

        if (newPassword !== "") {
            await changePassword(futureName, "", newPassword);
        }

        await changeUserRole(futureName, newRole);

        loadUsers().then(setUsers);
    }

    return (
        <div className={styles.settingsPage}>
            <div className={styles.settingsContainer}>
                <div className={styles.leftbox}>

                    <h1 className={styles.header}>Settings</h1>

                    <nav className={styles.navigation}>
                        <a className={selectedTab === "account" ? styles.navigationLinkActive : styles.navigationLinkInactive} id={"settings_Account"} onClick={() => handleTabClick("account")}>
                            Account
                        </a>
                        <a className={selectedTab === "color" ? styles.navigationLinkActive : styles.navigationLinkInactive} id={"settings_Appearance"} onClick={() => handleTabClick("color")}>
                            Appearance
                        </a>
                        <a className={selectedTab === "speech" ? styles.navigationLinkActive : styles.navigationLinkInactive} id={"settings_Accesibility"} onClick={() => handleTabClick("speech")}>
                            Accesibility

                        </a>

                        {/* Nutzerverwaltung: Nur für Admins verfügbar */}
                        {role === "administrator" && (
                            <a className={selectedTab === "user-management" ? styles.navigationLinkActive : styles.navigationLinkInactive} id={"settings_Management"} onClick={() => handleTabClick("user-management")}>
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
                            <span className={styles.settingsText} id={"settings_username"}>username: {name}</span>
                            <span className={styles.settingsText} id={"settings_role"}>role: {role}</span>
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
                            <p className={styles.settingsText}> Switch to dark mode </p><DarkModeButton />
                        </>
                    )}

                    {selectedTab === "speech" && (
                        <>
                            <h2 className={styles.header}>Easy Speech</h2>

                            <ToggleButton initialChecked={initialChecked}/>
                        </>
                    )}

                    {selectedTab === "user-management" && role === "administrator" && (
                        <>
                            <h2 className={styles.header}>User Management</h2>
                            <p className={styles.settingsText}>Manage system users and their roles. You can add, edit, or delete users.</p>

                            {/* Eingabemaske zum Hinzufügen eines neuen Benutzers, derzeit ohne Funktionalität */}
                            <div>
                                <h3 className={styles.header}>Add New User</h3>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        className={styles.userFormInput}
                                        id={"settings_NewUser"}
                                        type="text"
                                        placeholder="Enter username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <input
                                        className={styles.userFormInput}
                                        id={"settings_NewPassword"}
                                        type="password"
                                        placeholder="Enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <select
                                        className={styles.userFormSelect}
                                        id={"settings_ChooseRole"}
                                        required
                                        value={roleSet}
                                        onChange={(e) => setRole(e.target.value)}>

                                        <option value="simulator" id={"role_Simulator"}>Simulator</option>
                                        <option value="data_analyst" id={"role_Analyst"}>Data Analyst</option>
                                        <option value="administrator" id={"role_Admin"}>Admin</option>
                                    </select>

                                    <button
                                        type="button"
                                        id={"settings_AddUser"}
                                        className={styles.userFormButton}
                                        onClick={() => addUser(username, password, roleSet)}>
                                        Add User
                                    </button>
                                </form>
                            </div>

                            <div className={styles.userList}>
                                <h3 className={styles.header}>User List</h3>
                                <table className={styles.table}>
                                    <thead>
                                    <tr>
                                        <th className={styles.th}>Username</th>
                                        <th className={styles.th}>Password</th>
                                        <th className={styles.th}>Role</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td className={styles.td}>{user.username}</td>
                                            <td className={styles.td}>{user.password}</td>
                                            <td className={styles.td}>{user.role}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3 className={styles.header}>Delete User</h3>

                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    className={styles.userFormInput}
                                    id={"settings_OldUser"}
                                    type="text"
                                    placeholder="Enter username"
                                    required
                                    value={userToBeDeleted}
                                    onChange={(e) => SetUserToBeDeleted(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={styles.userFormButton}
                                    onClick={() => deleteUser(userToBeDeleted)}
                                    id={"settings_DeleteUser"}
                                >
                                    Delete User
                                </button>
                            </form>

                            <h3 className={styles.header}>Edit User</h3>

                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    className={styles.userFormInput}
                                    type="text"
                                    placeholder="Enter old username"
                                    required
                                    value={oldName}
                                    onChange={(e) => setOldName(e.target.value)}
                                />
                                <input
                                    className={styles.userFormInput}
                                    type="text"
                                    placeholder="Enter new username"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />

                                <input
                                    className={styles.userFormInput}
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPW}
                                    onChange={(e) => setNewPW(e.target.value)}
                                />

                                <select
                                    className={styles.userFormSelect}
                                    required
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                    <option value="simulator">Simulator</option>
                                    <option value="data_analyst">Data Analyst</option>
                                    <option value="administrator">Admin</option>
                                </select>

                                <button
                                    type="button"
                                    className={styles.userFormButton}
                                    onClick={() => editUserAdmin(oldName, newName, newPW,newRole)}
                                >
                                    Apply
                                </button>
                            </form>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;