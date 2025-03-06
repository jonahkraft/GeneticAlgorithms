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

                    <button className="button">Login</button>
                    <p><br/></p>
                    <div className="signup_link" onClick={() => window.location.href = '../../visualization.html'}>
                        Continue as Simulator
                    </div>
                </form>
            </div>
        </>
    );
}

// Check for User
function callUser(username: string, password: string) {
    axios.post('/api/login', {"username": username,"password": password })
        .then(response => {
			let token = response.data.access_token
            console.log(token)
            axios.post('/api/protected_test', {},
  				{
					headers: {
      					"Authorization": `Bearer ${token}`,
      					"Content-Type": "application/json"  // Ensure JSON data format
    				}
				}
  			)
        })
        .catch(error => {
            console.error(error);
        });
}

ReactDOM.createRoot(document.getElementById('root_login')!).render(<Login />);
