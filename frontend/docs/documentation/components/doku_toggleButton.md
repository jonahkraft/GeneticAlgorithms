### Dokumentation der toggleButton.tsx Datei

#### Credits:
Diese Komponente wurde von der Website universe.io übernommen, von dem User mrhydden.
Die Funktion die es ausführen soll wurde von uns überarbeitet.

https://uiverse.io/mrhyddenn/old-fish-66

#### Interface

```
interface ToggleButtonProps {
    initialChecked: boolean;
}
```
ToggleButtonProps ist ein Interface welches die Struktur für initialChecked festlegt

initialChecked gibt an ob der Schalter initial aktiviert sein soll

#### Funktionen:

```
function ToggleButton({ initialChecked }: ToggleButtonProps) {}
```
ToggleButton ist die Hauptfunktion der Datei toggleButton.tsx und initialisiert den toggleButton. Mithilfe
initialChecked entscheidet die Funktion ob der toggle an oder aus ist.


#### Variablen, Zustände und Funktionen
```
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
```
[isChecked, setIsChecked] beschreibt den Lokalen Zustand des Schalters

handleToggle ist eine Funktion für das Umschalten des Schalter-Zustands.

```
useEffect(() => {
        const updateCookies = async () => {
            const currentCookies = cookies.getCookies(); // Aktuelle Cookies abrufen
            currentCookies.easy_speech = isChecked; // Neuen Wert setzen
            cookies.saveCookies(currentCookies); // Cookies speichern
        };
        updateCookies();
    }, [isChecked]);
```
useEffect wird aufgerufen, wenn sich isChecked ändert. Es aktualsiert den Cookie-Wert entsprechend des neuen Zustands.

```
return()
```
Rückgabe der nötigen HTML Komponenten


 