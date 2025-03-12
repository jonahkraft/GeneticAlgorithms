import cookies from '../../cookies.ts'
import { useLocation } from 'react-router-dom';

function UserLabel(){
    const role = cookies.getCookies().role
    const location = useLocation();

    const getCurrentPage = () => {
        return location.pathname
    };
    // TODO: Idee war, dass displayed wird, mit welcher Art von Rolle man auf der Website "angemeldet" ist
    // TODO: Das CSS Styling des Header sollte DRINGEND mal überarbeite werden bitte

    if (getCurrentPage() === '/' || getCurrentPage() === '/login'){
        return
    }
    else {
        return <label>
            {role}
        </label>
    }
}

export default UserLabel