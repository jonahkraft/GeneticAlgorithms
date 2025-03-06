import Header from "../Header/Header.tsx"
import Footer from "../Footer/Footer.tsx"
import ReactDOM from 'react-dom/client';
import cookies from "../cookies.ts";

// props sollte ein user-Objekt sein

function Settings() {

    const data = cookies.getCookies()
    console.log(data)

    return(
        <>
            <Header/>
            <h1>Settings</h1>
            <br/>

            <p><b>Username:</b> {data.username}</p>
            <p><b>Role:</b> {data.role}</p>

            <br/>
            <Footer/>
        </>

    )
}

ReactDOM.createRoot(document.getElementById('root_settings')!).render(<Settings />);
