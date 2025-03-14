### Dokumentation für ButtonFunctions.ts


## Import

```
import { saveAs } from 'file-saver';
import getSimulationData from "../../get_simulation_data.ts";
```

saveAs: Wird verwendet, um eine Datei lokal zu speichern (CSV-Datei).
getSimulationData: Diese Funktion wird verwendet, um Simulationsdaten aus einer Backend-API abzurufen.

## Function
```
function placeholderButtonFunction() {}
```
Ein Platzhalter, der lediglich eine Benachrichtigung anzeigt. 

```
function showProtocol(){}
```
Ein Platzhalter.

```
function showDebug(){}
```
Ein Platzhalter.

```
function downloadCSV(filename: string, id: string){}
```
Die Funktion lädt Simulationsdaten für eine Experiment-ID herunter und speichert sie als CSV-Datei.

