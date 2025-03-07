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
abgespeichert.


```
function toggleSidebar 
```
Funktionalität noch nicht implementiert. Weniger Priorität für horizontalen Prototyp.  


```
function DataVisualization
```
Kernfunktion der HTML Seite Data Visualization. returned das entsprechende HTML Dokument.  

```
const [data, setData]
```
Speichert das übermittelte CSV aus dem Backend ab zur Weiterverarbeitung

```
const [generations, setGenerations]
```
Ermittelt Anzahl an Generationen.  

```
const [selectedGeneration]
```
Mithilfe von der const davor, wird je nach Auswahl der Generation das HTML Doc angepasst.

```
const [generatedElement, setGeneratedElement]
```
Aktualisiert die angezeigte Generation
