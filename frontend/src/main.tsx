import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import axios from 'axios'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
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
