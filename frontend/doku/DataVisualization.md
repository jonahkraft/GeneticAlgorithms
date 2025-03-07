## Doku zu DataVisualzation.tsx

```
function generateResultList 
```
Bekommt eine Liste übergeben, die sämtliche Informationen aus dem CSV-File des Backend enthälts. 
Auf Basis dieser Liste wird eine neue Liste konzipiert, die pro Generationen alle Datensätze enthält. 
Zum Testen für den horizontalen Prototyp wurde ein Example des Resultates gehardcoded und in 
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

```
const [data, setData]
```
Speichert das übermittelte CSV aus dem Backend ab zur Weiterverarbeitung (06.03)

```
const [generations, setGenerations]
```
Ermittelt Anzahl an Generationen.  (06.03)

```
const [selectedGeneration]
```
Mithilfe von der const davor, wird je nach Auswahl der Generation das HTML Doc angepasst. (06.03)

```
const [generatedElement, setGeneratedElement]
```
Aktualisiert die angezeigte Generation (07.03)
