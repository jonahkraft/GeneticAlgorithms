import './Login.css';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Header from "../Header/Header.tsx";
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function getUserdata(event: any) {
        event.preventDefault(); // Prevents the form from auto-submitting
        callUser(username, password);
    }

    return (
        <>
            <Header />
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={getUserdata}>
                    <div className="input-container">
                        <input
                            id="username"
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=" "
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-container">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="pass">Forget Password?</div>
                    <input name="submit" type="submit" value="Login" />
                    <div className="signup_link">
                        Not a Member? <a href="signup.php">Signup</a>
                    </div>
                    <a href="../../visualization.html" id="guest">Continue as Simulator</a>
                </form>
            </div>
        </>
    );
}

// Check for User
function callUser(user: string, password: string) {
    axios.post('/api/login', { user, password })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

ReactDOM.createRoot(document.getElementById('root_login')!).render(<Login />);
