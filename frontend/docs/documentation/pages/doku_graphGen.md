### Dokumentation für graphGen.tsx

```
interface HistoricalDataType {
    generation: string;
    'Final Drive': string;
    'Roll Radius': string;
    'Gear 3': string;
    'Gear 4': string;
    'Gear 5': string;
    Consumption: string;
    'Elasticity 3': string;
    'Elasticity 4': string;
    'Elasticity 5': string;
    'experiment_id': string;
}
```
Definiert die Struktur der Simulationsdaten, die an die Funktion übergeben werden sollen.

```
const graphGen = (data: HistoricalDataType[]) => {}
```
Die graphGen-Funktion erstellt ein Scatter-Diagramm mit Chart.js. Sie nimmt ein Array von Simulationsdaten (data) entgegen, extrahiert relevante Werte für Gänge (Gear 3, Gear 4, Gear 5) und Elastizitäten (Elasticity 3, Elasticity 4, Elasticity 5), und wandelt diese in eine neue Datenstruktur um. Danach wird das Canvas-Element mit der ID my_graph_gen gesucht, und ein Diagramm wird auf diesem Element gerendert. Das Diagramm zeigt die Beziehung zwischen den Gängen und Elastizitäten in Form von drei verschiedenen Datensätzen, jeweils mit einer eigenen Farbe für eine klare Unterscheidung. Die Achsen des Diagramms sind mit "Gear" und "Elasticity" beschriftet.


