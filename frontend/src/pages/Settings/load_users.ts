import axios from "axios";
import cookies from "../../cookies.ts";

interface UserData {
    role: string;
    username: string;
    password: string;
}

async function loadUsers(): Promise<UserData[]> {
    try {
        const response = await axios.get('/api/get_users', {
            headers: {
                "Authorization": `Bearer ${cookies.getCookies().token}`
            }
        });

        const users: UserData[] = Object.values(response.data[0].users);

        return users.map((user) => ({
            ...user,
            password: "**********"
        }));
    } catch (error) {
        console.error("Fehler beim Laden der Benutzer:", error);
        return [];
    }
}

export default loadUsers;