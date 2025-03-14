### Dokumentation für UserLabel

Die `UserLabel`-Komponente zeigt die Rolle eines angemeldeten Benutzers auf der Webseite an. Sie verwendet `cookies` zur Identifikation der Benutzerrolle und zeigt diese an.


```
cookies.getCookies()
```
Extrahiert die Rolle des Users.

```
useLocation()
```
Die `useLocation` Hook von `react-router-dom` wird verwendet, um die aktuelle URL der Seite zu erhalten.

```
const getCurrentPage
```
Diese Funktion gibt den Pfadnamen der aktuellen Seite (`location.pathname`) zurück und wird genutzt, um zu überprüfen, ob der Benutzer auf der Startseite oder Login-Seite ist.
- Wenn der Benutzer auf der Startseite (`/`) oder auf der Login-Seite (`/login`) ist, wird nichts gerendert und es wird keine Rolle angezeigt.
- Auf allen anderen Seiten wird die Rolle des Benutzers angezeigt.
