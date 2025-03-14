## Doku zu DataVisualzation.tsx

```
export interface HistoricalDataType {
```
Beschreibt, wie ein Datenobjekt für historische Daten aussehen muss. 

```
const testlist 
```
abgespeichert. (06.03)


```
function toggleSidebar 
```
Funktionalität noch nicht implementiert. Weniger Priorität für horizontalen Prototyp. (06.03) 


```
function DataVisualization
```
Kernfunktion der HTML Seite Data Visualization. returned das entsprechende HTML Dokument.  (05.03)

#### Variablen der Funktion DataVisualization
```
    const navigate = useNavigate();
    const easySpeech = cookies.getCookies().easy_speech
    const role = cookies.getCookies().role
```
``` navigate``` wird dafür genutzt zwischen den Seiten zu navigieren.

``` easySpeech``` speichert ob easySpeech aktiviert ist.

```role``` speichert welche Rolle der User momentan hat.

```
var commonConfig = { delimiter: "," };
```

```
    const normalText = "In the genetic algorithm we start with a population of entities. This population is the first generation. Every generation is the base of the following generation. This is archived by selecting and multiplying good entities and deleting bad ones. Each entity represents a set of input values and their corresponding results for consumption and elasticity. First the input values will be randomly set. After all results are computed, the entities will be ranked depending on their result values. Good performing entities with slightly modified values are used to generate a new population. The best performing entities are called elites. Elites are not modified, but copied to the next generation. The worst performing entities will not be used for future generations.";
    const easyText = "In the genetic algorithm, we start with a group of entities. This group is the first generation. Every generation is the base for the next one. Good entities are chosen and multiplied, while bad ones are removed. Each entity represents a set of values and their results for fuel usage and elasticity. The values are first set randomly. After computing the results, the entities are ranked based on their performance. Good performing entities are slightly changed and used to create a new group. The best performing entities are called elites. Elites are not changed but copied to the next group. The worst entities are not used in future generations.";

```
```normalText``` Text welcher angezeigt wird, wenn easySpeech deaktiviert ist.
```easyText``` Text welcher angezeigt wird, wenn easySpeech aktiviert ist.

```
    useEffect(() => {
        if (!cookies.isLoggedIn()) {
            console.log("redirect")
            navigate("/login");
        }
    }, [navigate]);
```
Hier wird React's useEffect-Hook verwendet, um zu überprüfen, ob der Benutzer eingeloggt ist. Falls nicht, wird der Benutzer auf die Login-Seite umgeleitet.

```
const [showHistoricalData, setShowHistoricalData] = useState(false)
```
HistoricalData wird am Anfang auf false gesetzt
```showHistoricalData``` speichert den aktuellen Zustand, bzw ob die Daten angezeigt werden.
```setShowHistoricalData```: Funktion welche verwendet wird um den Zustand zu ändern. Wenn ```setShowHistoricalData(true)``` aufgerufen wird, werden die Daten sichtbar, sonst versteckt.

```
function toggleHistoricalData()
```
Diese Funktion verändert ob Historical Data angezeigt wird. Wenn Daten momentan angezeigt werden, werden sie durch aufruf der Funktion nicht mehr angezeigt und anderherum

```
const [id, setId] = useState("0")
```
```id``` speichert den aktuellen Zustand, also welche id es Momentan hat.

```setId```  wird verwendet um den Wert von id zu ändern


```
const [data, setData]
```
Speichert das übermittelte CSV aus dem Backend ab zur Weiterverarbeitung (06.03)


```
const [generations, setGenerations]
```
Ermittelt Anzahl an Generationen.  (06.03)

```
const [selectedGeneration, setSelectedGeneration]
```
selectedGeneration speichert die ausgewählte Generation und zeigt diese auf der Website an

```
const [generatedElement, setGeneratedElement]
```
Aktualisiert die angezeigte Generation (07.03)

```
const [paraInputs, setParaInputs] 
```

```paraInputs``` enthält mehrere Schlüssel-Wert-Paare.
Diese Variablen beschreiben was man eingeben kann um eine Simulation zu starten. Darunter fallen generation_count (Anzahl der Generatione), aep, population_size(Größe der Population), given_seed(Vorgegebener oder zufälliger Wert), elite_count,(Anzahl der Elite-Individuen) alien_count(Anzahl der externen Individuen), weights(eine Liste von Gleitkommazahlen)

```setParaInputs``` aktualisiert den Zustand von paraInputs.


```
  const [transmittedData, setTransmittedData] = useState("Transmitted Data: None");
```
Der Startwert für  ```transmitted Data``` startet mit None.
Sie zeigt die übergebenen Parameter an

```
    useEffect(() => {
        if( data != null && data!.length > 0 ) {
            graph(data!);
        }
    }, [data]);
```
Dieser useEffect wird ausgeführt sobald sich die Variable data ändert. Falls data nicht null ist, und mindestens ein Element enthält wird die Funktion graph(data!) aufgerufen.
Es wird also der Graph aller Generationen angezeigt

```
    useEffect(() => {
        if( data && selectedGeneration) {
            const filtereddata = data.filter(entity => entity.generation === selectedGeneration);
            console.log(filtereddata)
            graphGen(filtereddata);
        }
    }, [data, generatedElement]);
```
Dieser useEffect wird ausgeführt wenn sich data oder generated Element ändert.
Falls data vorhanden ist und eine selectedGeneration existiert, durchsucht data.filter() alle data einträge, und nur die elemente welche aus der ausgewählten Generation sind.
Der Graph wird dann mit den gefilterten Daten aktualisiert.

```
function handleDropdownSelect(index: number)
```
In der handleDropdownSelect Funktion wird die gewählte Generation gespeichert und aktualisiert die UI für die Graphen.
Die Funktion ändert also das ausgewählte Eleement des Dropdowns

```
function handleParaChange(e: React.ChangeEvent<HTMLInputElement>)
```
Überprüft, ob ein gegebener Input eine gültige Dezimalzahl ist (zB 1234.5678). Die Funktion erlaubt auch nur ein Komma (.)

```
function updateData(data: HistoricalDataType[])
```
Die Funktion updateData aktualisiert die Zustände von data und id.

```
function handleTransmit(aep: string, generation_count: string, population_size: string, given_seed: string, elite_count: string, alien_count: string, weights: string, call: ((data: HistoricalDataType[]) => void))
```
Die Funktion handleTransmit zeigt übermittelte Daten auf Seite an.

```
function getGenertations(data: Record<string, HistoricalDataType[]>)
```
Falls das Data-Object nicht leer ist wird eine Liste der generierten Generationen gespeichert. Der Wert des Arrays wird über die funktion setGenerations gespeichert.

```
function parseCSVToList(csvContent: string)
```
Diese Funktion nimmt den Inhalt einer CSV als string und verwandelt ihn in eine Liste für die Datenvisualisierung.

```
function uploadCSV(event: React.ChangeEvent<HTMLInputElement>)
```
Die Funktion uploadCSV kümmert sich darum dass die Website Dateien updoaden kann und die gegebene CSV in eine Liste verwandelt wird.

Die Funktion Datavisualization gibt das Nötige HTML für die Seite Datenvisualisierung zurück.

