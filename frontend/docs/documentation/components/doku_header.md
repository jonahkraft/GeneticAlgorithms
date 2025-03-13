### Dokumentation der Komponente Header.tsx

Die Headerkomponente beschreibt die Navigationsleiste und ermöglicht das Wechseln zwischen den verschiedenen
Seiten sowie das Ein- und Ausloggen

```
import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import cookies from '../../cookies.ts';
import UserLabel from "../UserLabel/UserLabel.tsx";
```
link ermöglicht die Navigation zwischen den Seiten

useNavigate aus dem React Router dient zur programmgesteuerten Naviagation zwischen den Seiten

styles wird für das Design der einzelnen Elemente importiert

cookies wird zur Verwaltung der Cookie Dateien genutzt

UserLabel ist eine zusätzliche Komponente zur Anzeige des Nutzernamens.

```
function Header() {
```
???

```
const signed_in = cookies.isLoggedIn()
```

signed_in nutzt die cookies um zu speichern, ob der User momentan eingeloggt ist

```
const navigate = useNavigate()
```

navigate wird zur naviagtion innerhalb der Website verwendet

```
function logOut()
```

Falls auf den Logout-Button gedrückt wird kommt eine Nachricht ob man sich wirklich ausloggen will. Falls ja, werden
alle gespeicherten Cookies gelöscht und die Seite neugeladen. Sonst passiert nichts

```
return()
```
Der entsprechende HTML-Header wird zurückgegeben.
