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

useNavigate aus dem React Router dient zur programmgesteuerten Naviagation zwischen den Seiten

cookies wird zur Verwaltung der Cookie Dateien genutzt

GenericButton wird für die einheitlichen Buttons der Website genutzt


```
function Home(){}
```

Kernfunktion der Homepage.
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
    const normalFAQ = {
        purpose: "This simulation is designed to optimize specific characteristics of a car using a genetic algorithm. A set of predefined parameters is provided to the algorithm, which then iterates through multiple generations, continuously improving until an optimal solution is found.",
        usage: "To begin, navigate to the Data Visualization page. There, you can define the relevant parameters and start the simulation. If you wish to analyze a specific generation in more detail, you can select it from the drop-down menu.",
        graphs: "The overview graph displays all members of the population, organized by generation and consumption. The generation-specific graph provides a more detailed view, where each member of a generation is represented by three points—one for each of the three gears. These points are positioned based on their gear and elasticity."
    };
```
normalFAQ speichert den Text für die 3 Antworten auf das FAQ. Purpose steht hierbei für die Antwort auf Frage 1, usagee für Frage 2 und graphs für Frage 3.
Das ist der Text welcher genutzt wird wenn Easy Speech nicht aktiviert ist.

```
    const easyFAQ = {
        purpose: "This simulation helps find the best car settings using a genetic algorithm. It improves over multiple rounds until it finds a good solution.",
        usage: "Go to the Data Visualization page. There, you can set parameters and start the simulation. You can also choose a past round to look at in detail.",
        graphs: "The first graph shows all results, sorted by round and fuel use. Another graph shows more details, where each car is marked by three points—one per gear."
    };
```
easyFAQ speichert den Text für die 3 Antworten auf das FAQ. Purpose steht hierbei für die Antwort auf Frage 1, usagee für Frage 2 und graphs für Frage 3.
Hier wird der Text gespeichert welcher bei Aktivität von easy speech genutzt wird

```
function clickButton(){}
```
Diese Funktion stellt sicher, dass wenn man eingeloggt ist und auf die Data Visualization Page möchte, man entweder
auf die Login Page weitergeleitet wird, falls man nicht angemeldet ist und falls man schon angemeldet ist
direkt auf die Datenvisualisierung.

```
return()
```
Gibt die nötigen HTML Elemente für die Website zurück







