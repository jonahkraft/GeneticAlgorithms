## Dokumentation der Login-Komponente

Die Login-Komponente stellt das User Interface für den Prozess des Einloggens bereit.
Diese Dokumentation beginnt mit der Datei "Login.tsx".

```
function Login() {}
```

Hierbei handelt es sich um die React-Komponente für das Login. Diese enthält zunächst einige Variablen.
```
const [username, setUsername] = useState('');
```

Hierüber wird der Nutzername, der über das Eingabefeld eingegeben wird, gespeichert. "username"
ist die entsprechende Variable und setUsername wird verwendet, um diese zu verändern. useState('') ist der Zustand der
Variable, anfangs ein leerer String, weil noch nichts eingegeben wurde.

```
const [password, setPassword] = useState('');
const [text, setText] = useState('')
const [displaysWarning, setDisplaysWarning] = useState(false);
```

Diese Variablen werden analog zu "username" verwaltet. Sie enthalten das eingegebene Passwort, den Text der Warnung, die
eingeblendet wird, falls der Nutzername oder das Passwort falsch ist und einen Verweis darauf, ob die Warnung gerade
angezeigt wird.

```
function getUserdata(event) {}
```

Diese Funktion wird ausgeführt, wenn das Formular abgeschickt wird. Sie sorgt dafür, dass die Eingabe sofort verarbeitet
werden kann, ohne die Seite dafür neu laden zu müssen.

```
function triggerWarning() {}
```

Diese Funktion soll einen Hinweis anzeigen, dass der Benutzername oder das Passwort falsch ist. Sie wird als Reaktion auf






