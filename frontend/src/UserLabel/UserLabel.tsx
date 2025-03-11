import cookies from '../cookies.ts'

function UserLabel(){
    const role = cookies.getCookies().role

    const getCurrentPage = () => {
        return window.location.pathname;
    };
    // TODO: Idee war, dass displayed wird, mit welcher Art von Rolle man auf der Website "angemeldet" ist
    // TODO: Das CSS Styling des Header sollte DRINGEND mal überarbeite werden bitte

    if (getCurrentPage() === '/index.html' || getCurrentPage() === '/login.html'){
        return
    }
    else {
        return <label>
            {role}
        </label>
    }
}

export default UserLabel