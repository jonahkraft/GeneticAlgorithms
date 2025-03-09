import styles from './Header.module.css'
import cookies from '../cookies.ts'


function Header() {
    const signed_in = cookies.getCookies()["signed_in"];

    function logOut() {
        cookies.deleteCookies();
        window.location.reload();
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                {/* Logo */}

                <a href="../../index.html" className={styles.logo}>
                    <img src="../../favicon.svg" alt="Logo von GeneticAlgorithms" width="20px" height="20px"/>
                </a>

                {/* Navigation */}

                <ul className={styles.navbarList}>
                    <li>
                        <a href="../../index.html" className={styles.navbarListItem}>Home</a>
                    </li>

                    <li>
                        <a href="../../visualization.html" className={styles.navbarListItem}>Data Visualization</a>
                    </li>

                    <li>
                        <a href="../../settings.html" className={styles.navbarListItem}>Settings</a>
                    </li>

                    {/*Button für Login bzw. Logout je nach aktuellem Zustand*/}

                    {signed_in ? (
                        <li>
                            <a onClick={logOut} className={styles.navbarListItem}>Logout</a>
                        </li>
                    ) : (
                        <li>
                            <a href="../../login.html" className={styles.navbarListItem}>Login</a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
