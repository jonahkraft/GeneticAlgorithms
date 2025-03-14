### Dokumentation für load_user.ts

```
interface UserData {
    role: string;
    username: string;
    password: string;
}
```
Es wird die Struktur der Benutzerdaten definiert, die die Rolle, den Benutzernamen und das Passwort eines Benutzers beschreiben.

```
function loadUsers() {}
```
Die Funktion lädt eine Liste von Benutzern vom Server und maskiert die Passwörter. Tritt ein Fehler auf, wird eine leere Liste zurückgegeben.


