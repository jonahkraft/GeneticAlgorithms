import cookies from "../cookies.ts";

function UserPersmissionsComponent(){
    const role = cookies.getCookies().role
    console.log(role);

    if (role === 'admin') {
        console.log(1);
        return <div>👑 Admin-Bereich</div>; // JSX zurückgeben
    } else if (role === 'data_analyst') {
        console.log(2);
        return <div>📊 Data Analyst Dashboard</div>; // JSX zurückgeben
    } else {
        console.log(3);
        return <></>; // Falls kein Inhalt, dann `null`
    }
}

export default UserPersmissionsComponent;
