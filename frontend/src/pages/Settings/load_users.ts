import axios from "axios";
import cookies from "../../cookies.ts";

function loadUsers() {

    console.log(cookies.getCookies())

    axios.get('/api/get_users', {
        headers: {
            "Authorization": `Bearer ${cookies.getCookies().token}`
        }
    })
        .then(response => {
            const users = response.data[0].users;
            console.log(users);
            console.log(typeof(users))

            for (const key in users) {
                console.log(key)
                console.log(users[key as keyof typeof users])
            }

        })
        .catch(error => {
            console.error("Fehler beim Laden der Benutzer:", error);
        });
}

export default loadUsers;
