### Dokumentation der Komponente Header.tsx

Die Headerkomponente beschreibt die leiste Oben welche auf jeder
Seite der Website sichtbar ist, mit den "Funktionen": Home, Datavisualizatiom, Settings, Login/Logout

```function Header()```

... Mit den folgenden Variablen und Funktionen:

```const signed_in = cookies.isLoggedIn()```

nutzt cookies.isLoggedIn um zu speichern ob der User momentan eingeloggt ist

```const navigate = useNavigate()```

Variable welche genutzt wird um zwischen verschiedenen Seiten der Website zu navigieren

```function logOut()```

Falls auf den logout Button gedrückt wird kommt eine Nachricht ob man sich wirklich ausloggen will. Falls ja werden
alle gespeicherten Cookies gelöscht und die Seite neugeladen.