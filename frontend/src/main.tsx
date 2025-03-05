import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './HomePage/HomePage.tsx'

import axios from 'axios'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)

// Just a test :)
function echo(msg: any) {
	axios.post('/api/echo', { msg })
		.then(response => {
			console.log(response.data)
		})
		.catch(error => {
			console.error(error)
		})
}

echo("TEST")

// Check for User
function callUser(user: string, password: string){
	axios.post('/api/echo', { user, password })
		.then(response => {
			console.log(response.data)
		})
		.catch(error => {
			console.error(error)
		})
}

callUser("Alfred", "1234")

export default callUser