## Dokumentation für Komponente UserPermissions
```
import cookies from "../../cookies.ts";
```
Importiert Cookies für die Verwaltung von Rollen.


```
import GenericButton from "../GenericButton/GenericButton.tsx";
import {placeholderButtonFunction} from "../../pages/DataVisualization/ButtonFunctions.ts";
```

Imports damit Buttons verwendet und verwaltet werden können. 


```
function UserPersmissions()
```
```
    const role
```
    Konstante die die Rolle des benutzers speichert


Die Funktion prüft ob die Rolle des Users Admin ist, wenn ja, generiert sie die Buttons, auf die nur der Admin zugriff hat.
Ist der User kein Admin, prüft die Funktion ob der User Data Analyst ist, wenn ja, dann generiert sie den entsprechenden Button
Hat der User keine der beiden Rollen, tut die funktion nichts.