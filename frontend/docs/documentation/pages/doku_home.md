### Dokumentation für die home.tsx

Die Home-Komponente stellt die Startseite der Anwendung dar und bietet eine Einführung
in die Simulation sowie eine FAQ-Sektion.

## Import

```
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import cookies from "../../cookies.ts";
import GenericButton from '../../components/GenericButton/GenericButton.tsx';
```

styles wird für das Design der einzelnen Elemente importiert

useNavigate aus dem React Router dient zur Naviagation zwischen den Seiten

cookies wird zur Verwaltung der Cookie Dateien genutzt

GenericButton wird für die einheitlichen Buttons der Website genutzt


```
function Home(){}
```

Die function Home ist eine React-Komponente welche die Main Page handhabt.
Diese enthält folgende Elemente:

## Variablen, Zustände und Funktionen:

```
const navigate = useNavigate()
```

navigate ermöglicht das Navigieren zwischen verschiedenen Seiten der Website.

```
const easySpeech = cookies.getCookies().easy_speech
```
easySpeech überprüft ob der einfache Sprache Modus aktiviert ist

```
const normalP1 = "Evolution: The driving force for diversity and adaptation on our planet. Natural selection ensures that only the strongest survive and pass on the secret of their success to their children.";
```
normalP1 speichert den Text, für die Einführung zur Evolution, welcher gezeigt wird falls "Easy Speech" deaktiviert ist

```
const easyP1 = "Evolution: The force that helps living things change and survive. Only the strongest can survive and teach their children how to succeed.";
```

easyP1 speichert den Text, für die Einführung zur Evolution, welcher gezeigt wird falls "Easy Speech" aktiviert ist
```
const normalP2 = "Our simulation uses these same principles in the form of genetic algorithms to find the optimal balance between performance and consumption in vehicles. For each configuration of parameters, the program returns the Pareto front, a collection of solutions where no value can be improved without worsening another.";
```
normalP2 speichert den Text, für die Einführung zur Simulation, welcher gezeigt wird falls "Easy Speech" deaktiviert ist

```
const easyP2 = "Our simulation uses genetic algorithms to find the best balance between performance and fuel usage in vehicles. For each set of parameters, the program shows the Pareto front, a set of solutions where no value can be improved without making another worse.";
```
easyP2 speichert den Text, für die Einführung zur Simulation, welcher gezeigt wird falls "Easy Speech" aktiviert ist


```
function clickButton(){}
```
Diese Funktion stellt sicher, dass wenn man eingeloggt ist und auf die Data Visualization Page möchte, man entweder
auf die Login Page weitergeleitet wird, falls man nicht angemeldet ist und falls man schon angemeldet ist
direkt auf die Datenvisualisierung.




