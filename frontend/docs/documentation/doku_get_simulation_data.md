### Dokumentation für getSimulationData.ts

Dieses Modul ist für den Abruf und die Verarbeitung von Simulationsdaten aus einer API verantwortlich. Es sendet eine Anfrage an den Server, empfängt eine CSV-Antwort und verarbeitet diese.

#### **Datenstruktur: `HistoricalData`**
Die `HistoricalData`-Schnittstelle definiert das Format der Simulationsdaten:
- `generation`: Generation der Simulation
- `Final Drive`, `Roll Radius`, `Gear 3`, `Gear 4`, `Gear 5`: Getriebedaten
- `Consumption`: Verbrauchsdaten
- `Elasticity 3`, `Elasticity 4`, `Elasticity 5`: Elastizitätswerte
- `experiment_id`: ID des jeweiligen Experiments

```
`parseCSV(csv: string): Record<string, HistoricalData[]>`**
```
Diese Funktion konvertiert eine CSV-Zeichenkette in eine strukturierte Datenform.
1. Die CSV wird in Zeilen aufgeteilt.
2. Die Kopfzeile wird als Spaltenüberschrift extrahiert.
3. Jede nachfolgende Zeile wird in ein `HistoricalData`-Objekt umgewandelt.
4. Die Daten werden nach `experiment_id` gruppiert.
5. Innerhalb jeder Experimentengruppe werden die Daten nach `generation` sortiert.

#### **Rückgabe:**
Ein `Record<string, HistoricalData[]>`, wobei der Schlüssel die `experiment_id` ist und die Werte Listen der historischen Simulationsdaten enthalten.


```
`getSimulationData()
```
Diese Funktion ruft Simulationsdaten von der API ab und verarbeitet sie mit `parseCSV`.
1. Eine **POST-Anfrage** wird an `/api/get_simulation_data` gesendet.
2. Die Anfrage enthält:
    - `columns`: Eine Liste der abzurufenden Spalten.
    - `row_constraints`: Filterkriterien für die Daten.
    - **Authentifizierung:** Das Token wird über `cookies.getCookies().token` bereitgestellt.
3. Die API gibt eine CSV-Zeichenkette zurück.
4. `parseCSV` verarbeitet die Antwort und gibt die strukturierten Daten zurück.

#### **Rückgabe:**
Ein Promise, das ein `Record<string, HistoricalData[]>` liefert.

#### **Fehlerbehandlung:**
Falls der API-Abruf fehlschlägt, wird der Fehler in der Konsole ausgegeben und erneut geworfen.


#### **Export**
Das Modul exportiert die Funktion `getSimulationData`, sodass sie in anderen Komponenten verwendet werden kann.


