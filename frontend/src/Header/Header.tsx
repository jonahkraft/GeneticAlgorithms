import './Header.module.css'

function Header() {
    return (
        <nav>
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <a href="../../index.html" className="logo"><img src="../../public/favicon.svg" alt="Logo" width="20px" height="20px"/></a>
            <ul id="navigation">
                <li><a href="" className="btn active">Home</a>
                </li>
                <li><a href="#" className="btn">Datenvisualisierung</a></li>
                <li><a href="../../login.html" className="btn">Login</a></li>
            </ul>
        </nav>
    )
}

export default Header
