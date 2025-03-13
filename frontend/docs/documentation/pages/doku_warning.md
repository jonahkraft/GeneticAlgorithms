### Dokumentation der Datei Warning.tsx
#### Import:

```
import styles from "./Warning.module.css"
```
styles wird importiert für das Design der "Warning".

#### Funktionen:

```
function Warning({ text }: any){}
```
Funktion, welche für das Erstellen von Warnungen zuständig ist (Beispielweise die Warnung ob man sich ausloggen möchte.)
Die Variable text beschreibt den Text welcher auf der Warnung stehen soll.

```
return <p className={styles.label}>{text}</p>;
```
Die Funktion gibt das nötige HTML der Warnung zurück.