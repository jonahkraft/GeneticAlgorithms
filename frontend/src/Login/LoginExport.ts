import cookies from "../cookies.ts";

function logIn(username: string) {
    let role = ''

    if (username === "admin") {
        // TODO: Nur für die Präsentation!!
        role = "admin"
    }

    else if (username === "data_analyst"){
        // TODO: Nur für Prototyp
        role = 'data_analyst'
    }

    else if (username !== "placeholder") {
        // dann wurde es über login aufgerufen
        // TODO: sollte callUser aufrufen und davon die Rolle des Benutzers erhalten
        // dafür zusätzlich password als Argument nehmen
        role = "simulator"

        // TODO: Fehlermeldung, wenn Name oder Passwort falsch
        // Funktion triggerWarning dafür nutzen

    }
    else {
        // dann wurde es über "continue as simulator" aufgerufen
        role = "simulator"
    }

    cookies.saveCookies({"username": username, "role": role, "signed_in": true})
    window.location.reload()
    window.location.href = "../../visualization.html"
}

export default logIn;