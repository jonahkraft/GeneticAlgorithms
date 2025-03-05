import './Login.css'
import ReactDOM from 'react-dom/client'
import axios from 'axios'


function Login() {
    function getUserdata(event: any) {
        event.preventDefault(); // Verhindert das automatische Absenden des Formulars
        // @ts-ignore because it works
        const username = document.getElementById("username").value;
        // @ts-ignore because it works (if it works dont touch it!)
        const password = document.getElementById("password").value;
        callUser(username, password)
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <form action="" method="POST">
                <div>
                    <input id="username" type="text" name="text" required />
                    <span></span>
                    <label>Username</label>
                </div>
                <div>
                    <input id="password" type="password" name="password" required />
                    <span></span>
                    <label>Password</label>
                </div>
                <div className="pass">Forget Password?</div>
                <input name="submit" type="submit" value="Login" onClick={getUserdata} />
                <div className="signup_link">
                    Not a Member ? <a href="signup.php">Signup</a>
                </div>
            </form>
        </div>
    );
}

// Check for User
function callUser(user: string, password: string){
    console.log(password)
    console.log(user)
    axios.post('/api/echo', { user, password })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}



ReactDOM.createRoot(document.getElementById('root_login')!).render(<Login></Login>);
//export default Login