import axios from "axios";
import cookies from "../../cookies.ts";

export async function changeUsername(oldUsername: string, newUsername: string) {
    try {
        await axios.post('/api/change_username',
            { old_username: oldUsername, new_username: newUsername },
            { headers: { "Authorization": `Bearer ${cookies.getCookies().token}` } }
        );
        console.log("Benutzername erfolgreich geändert");
    } catch (error: any) {
        console.error("Fehler beim Ändern des Benutzernamens:", error.response?.data?.msg || error.message);
    }
}

export async function changeUserRole(username: string, role: string) {
    try {
        await axios.post('/api/change_role',
            { username, role },
            { headers: { "Authorization": `Bearer ${cookies.getCookies().token}` } }
        );
        console.log(`Rolle von ${username} erfolgreich zu ${role} geändert`);
    } catch (error: any) {
        console.error("Fehler beim Ändern der Rolle:", error.response?.data?.msg || error.message);
    }
}

export async function changePassword(username: string, oldPassword: string, newPassword: string) {
    try {
        await axios.post('/api/change_password',
            { username, old_password: oldPassword, new_password: newPassword },
            { headers: { "Authorization": `Bearer ${cookies.getCookies().token}` } }
        );
        console.log(`Passwort für ${username} erfolgreich geändert`);
    } catch (error: any) {
        console.error("Fehler beim Ändern des Passworts:", error.response?.data?.msg || error.message);
    }
}
