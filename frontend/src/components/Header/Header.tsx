import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import cookies from '../../cookies.ts'
import UserLabel from "../UserLabel/UserLabel.tsx";

function Header() {
    const signed_in = cookies.isLoggedIn()
    const navigate = useNavigate();

    function logOut() {
        if (confirm("Are you sure you want to sign out?")) {
            cookies.deleteCookies();
            window.location.reload();
            window.location.href = "/"
            navigate("/")
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                {/* Logo */}
                <Link to="/" className={styles.logo} id={"navbar_Icon"} ><img src="/favicon.svg" alt="Logo of GeneticAlgorithms" width="20px" height="20px"/></Link>

                {/* Navigation */}

                <ul className={styles.navbarList}>
                    <li>
                        <Link to="/" className={styles.navbarListItem} id={"navbar_Home"} >Home</Link>
                    </li>

                    <li>
                        <Link to="/data_visualization" className={styles.navbarListItem} id={"navbar_Data"} >Data Visualization</Link>
                    </li>

                    {/*VisualizationButton für Login bzw. Logout bzw. Settings je nach aktuellem Zustand*/}

                    {signed_in ? (
                        <>
                            <li>
                                <Link to="/settings" className={styles.navbarListItem} id={"navbar_Settings"} >Settings</Link>
                            </li>

                            <li>
                                <a onClick={logOut} className={styles.navbarListItem} id={"navbar_Logout"}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className={styles.navbarListItem} id={"navbar_Login"} >Login</Link>
                        </li>
                    )}
                </ul>
                <UserLabel/>
            </nav>
        </header>
    );
}

export default Header;
