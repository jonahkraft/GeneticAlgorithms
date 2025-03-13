### Dokumentation für CSS des DarkModeButton

Das CSS für den DarkModeButton implementiert das visuelle Design eines Schalters für den Dark Mode.

```
 .toggleSwitch
```
Positionierung: Der Container ist leicht nach oben und links verschoben.
Größe: 100px Breite und 5px Höhe.
Farben: Zwei benutzerdefinierte Variablen `--light` und `--dark` für die Helligkeit des Schalters.

```
.switchLabel
```

Position: Das Label ist absolut innerhalb des Containers positioniert.
Größe: 80% der Breite und 30px Höhe.
Design: Hintergrundfarbe `--dark`, abgerundete Ecken (radius 55px), mit einem Border in der Farbe von `--dark`.
Interaktivität: Der Cursor wird auf "pointer" gesetzt, um auf die Klickbarkeit hinzuweisen.

```
.checkbox
```

Versteckt: Das `input`-Element wird unsichtbar gemacht, da der Benutzer direkt mit dem Label interagiert.

```
.slider
```
Design: Das visuelle Element des Schalters, das die Umstellung darstellt. Es hat abgerundete Ecken und eine sanfte Übergangsanimation von 0.3s.

```
.checkbox:checked ~ .slider
```
Farbe: Wenn die Checkbox aktiviert ist, ändert sich die Hintergrundfarbe des Sliders zu `--light`.

```
.slider::before
```
Design: Das innere runde Element des Sliders, das sich beim Umschalten von einer Seite zur anderen bewegt. Es hat eine Farbe von `--dark` und einen Schatten, der das visuelle Aussehen eines Schiebereglers simuliert.
Positionierung und Übergang: Das Element bewegt sich bei Aktivierung der Checkbox nach rechts und ändert seine Farbe sowie den Schatten.

```
.checkbox:checked ~ .slider::before
```
Bewegung: Wenn die Checkbox aktiviert ist, wird der Schieberegler nach rechts verschoben, seine Farbe wird zu `--dark` und der innere Schatten verschwindet.

