### Dokumentation für die parameters.tsx

## Imports

```
import cookies from "../../cookies.ts";
import axios from "axios";
import getSimulationData, { HistoricalDataType } from "../../get_simulation_data.ts";
```
Es wird die cookies-Funktion zur Cookie-Verwaltung, axios für HTTP-Anfragen und getSimulationData sowie den Typ HistoricalDataType zur Verarbeitung von Simulationsdaten importiert.

```
function transmitParameters() {}
```
Die Funktion prüft, ob die Parameter korrekt sind. Wenn nicht, wird eine Fehlermeldung angezeigt.
Sie sendet eine Anfrage an den Backend-Server, um die Simulation zu starten, und übergibt die Simulationsparameter, einschließlich der Population, Anzahl der Generationen und anderer Einstellungen.
Nach dem erfolgreichen Start der Simulation wird eine API-Abfrage ausgeführt, um die Simulationsdaten zu erhalten, die dann an eine angegebene Callback-Funktion übergeben werden.
