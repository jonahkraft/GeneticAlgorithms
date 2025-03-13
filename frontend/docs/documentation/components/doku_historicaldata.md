### Dokumentation für HistoricalData.tsx

Das Modul `HistoricalData.tsx` lädt Simulationsdaten aus einer externen Datenquelle und speichert diese.

```
interface GenerationData
```
Struktur: Definiert die Struktur der geladenen Simulationsdaten.
Felder: Beinhaltet Eigenschaften wie `generation`, `Final Drive`, `Roll Radius`, `Gear 3`, `Gear 4`, `Gear 5`, `Consumption`, `Elasticity 3`, `Elasticity 4`, `Elasticity 5`.

```
const [resultData, setResultData] = useState<GenerationData[]>([])
```
Initialisierung: Erstellt einen State-Hook zur Speicherung der geladenen Simulationsdaten.
Datentyp: `GenerationData[]`, also ein Array von Objekten mit den oben definierten Eigenschaften.

```
function loadResultData()
```
Funktion: Lädt Simulationsdaten von `getSimulationData()` und speichert sie im State.
Gibt eine Fehlermeldung in der Konsole aus, falls die Daten nicht geladen werden können.

```
useEffect()
```
Wird ausgelöst, sobald `resultData` sich ändert.
Debugging: Gibt die geladenen Daten in der Konsole aus, falls vorhanden.

```
return istorical Data
```
Gibt Überschrift "Historical Data" aus.

