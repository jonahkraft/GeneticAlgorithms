### Dokumentation der Datei Graph.tsx

#### Import

```
import Chart from 'chart.js/auto'
```

Chart wird genutzt um die Graphen zu erstellen für die Visualisierung

#### interface

```
interface HistoricalDataType {}
```
Hier wird festgelegt wie der Datentyp HistoricalDataType aussehen soll.

#### Funktionen

```
function graph(data: HistoricalDataType[])
```
Die Funktion graph nimmt den Datentyp HistoricalDataType entgegen und visualisiert die gegebenen Daten.

#### Variablen und Methoden in graph

```
const list: { gen: string; consumption: string }[] = [];
```

In List werden die einzelnen werte gespeichert, für den Scatter-Plot

```
const avgMap: Record<string, { sum: number; count: number }> = {}; 
```
Objekt zur Berechnung der Durchschnittswerte

```
data.forEach(entry => {
```
Diese Methode iteriert durch alle Generationen durch

```
const avg = Object.keys(avgMap).map(gen => ({
        gen,
        genAvg: avgMap[gen].sum / avgMap[gen].count,
        }));
```

```
const ctx = document.getElementById("my_graph") as HTMLCanvasElement;
```
Das Canvas-Element wird abgerufen




es werden die Durchschnittsdaten für den visualisieren graph erstellt
