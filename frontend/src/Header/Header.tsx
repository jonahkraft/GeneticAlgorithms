import './Header.module.css'
import cookies from '../cookies.ts'


function Header() {

    const signed_in = cookies.getCookies()["signed_in"]

    if (!signed_in) {
        return (
            <header>
                <nav>
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    <a href="../../index.html" className="logo">
                        <img src="../../public/favicon.svg" alt="Logo" width="20px" height="20px"/>
                    </a>
                    <ul id="navigation">
                        <li><a href="../../index.html" className="btn active">Home</a></li>
                        <li><a href="../../visualization.html" className="btn">Data Visualization</a></li>
                        <li><a href="../../settings.html" className="btn">Settings</a></li>
                        <li><a href="../../login.html" className="btn">Login</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
    else {
        return (
            <header>
                <nav>
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    <a href="../../index.html" className="logo">
                        <img src="../../public/favicon.svg" alt="Logo" width="20px" height="20px"/>
                    </a>
                    <ul id="navigation">
                        <li><a href="../../index.html" className="btn active">Home</a></li>
                        <li><a href="../../visualization.html" className="btn">Data Visualization</a></li>
                        <li><a href="../../settings.html" className="btn">Settings</a></li>
                        <li><a onClick={() => logOut()} className="btn">Logout</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

function logOut() {
    cookies.deleteCookies()
    window.location.reload()
    console.log("logging out")
    console.log(cookies.getCookies())
}

export default Header;
