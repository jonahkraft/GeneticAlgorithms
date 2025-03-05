import './Header.module.css'

function Header() {
    return (
        <nav>
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <a href="#home" className="logo">Logo</a>
            <ul id="navigation">
                <li><a href="#home" className="btn active">Home</a>
                </li>
                <li><a href="#about" className="btn">Blank</a></li>
                <li><a href="#menu" className="btn">Blank</a></li>
                <li><a href="#order" className="btn">Blank</a></li>
                <li><a href="#contact" className="btn">Blank</a></li>
            </ul>
        </nav>
    )
}

export default Header
