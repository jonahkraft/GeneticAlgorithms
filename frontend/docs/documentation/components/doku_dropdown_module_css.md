# Dokumentation Dropdown Menü 


Dieses Dropdown-Menü besteht aus mehreren CSS-Klassen, die ein visuelles Dropdown-Menü erstellen. Es enthält einen Button, der das Dropdown anzeigt, sowie eine Liste von Auswahlmöglichkeiten, die bei Hovering eine visuelle Rückmeldung geben.

```
.wrapper
```

- Diese Klasse wird verwendet, um das Container-Element des Dropdowns zu definieren. Es wird eine relative Positionierung verwendet, um das Dropdown-Menü in Bezug auf diesen Container zu platzieren.
- `position: relative;` setzt die Positionierung relativ, damit das Dropdown-Menü relativ zu diesem Container positioniert werden kann.
- `display: inline-block;` Ermöglicht es dem Container, sich neben anderen Inline-Elementen zu befinden.

```
.dropdownContent
```

- Diese Klasse wird auf das eigentliche Dropdown-Menü angewendet, das angezeigt wird, wenn der Benutzer auf den Dropdown-Button klickt oder mit der Maus darüber fährt.
- `position: absolute;` Setzt das Dropdown-Menü in eine absolute Position relativ zu seinem Container (der `.wrapper`-Klasse).
- `min-width: 160px;` Definiert eine Mindestbreite für das Dropdown-Menü.
- `box-shadow` Fügt dem Dropdown-Menü einen Schatten hinzu, um es visuell hervorzuheben.

```
.dropdownContent li
```

- Diese Klasse wird auf jedes Listenelement innerhalb des Dropdown-Menüs angewendet.
- `text-decoration: none;` Entfernt die Standard-Unterstreichung von Links.
- `display: block;` Stellt sicher, dass jedes Listenelement in einer Block-Darstellung angezeigt wird.
- `text-align: left;` Richtet den Text innerhalb der Listenelemente nach links aus.

```
.ddSelector
```
- Diese Klasse wird auf den Dropdown-Button angewendet, der das Menü anzeigt.
- `border-radius: 1.5em;` Rundet die Ecken des Buttons ab.
- `color: white;` Setzt die Textfarbe auf Weiß.
- `background-color: #0b132f;` Setzt den Hintergrund des Buttons auf einen dunkelblauen Farbton.
- `height: 3em;` Setzt die Höhe des Buttons.
- `padding-left: 2em;` und `padding-right: 2em;`: Fügt innerhalb des Buttons einen Abstand links und rechts hinzu.

```
.ddSelector:hover
```
- Diese Klasse wird angewendet, wenn der Benutzer mit der Maus über den Dropdown-Button fährt (Hover-Effekt).
- `background-color: #0023e0;` Ändert den Hintergrund des Buttons auf einen leuchtenden blauen Farbton.
- `transform: scale(1.05);` Vergrößert den Button leicht.

```
ul, ul > *
```
- Diese Regeln beeinflussen alle `ul`-Elemente (ungeordnete Listen) und ihre Kindelemente innerhalb des Dropdowns.
- `box-shadow: none;` Entfernt den Schatten von Listen.
- `margin: 0px;` Setzt den Rand auf Null.
- `padding: 0px;` Setzt die Polsterung auf Null.

```
li > button
```
- Diese Regel definiert das Verhalten für die Schaltflächen innerhalb des Dropdown-Menüs.
- `width: 100%;` Stellt sicher, dass der Button die gesamte Breite des Listenelements ausfüllt.

```
.ddItem
```
- Diese Klasse wird auf jedes Listenelement im Dropdown angewendet, das als auswählbare Option fungiert.
- `color: black;` Setzt die Textfarbe auf Schwarz.
- `background-color: white;` Setzt den Hintergrund der Listenelemente auf Weiß.
- `height: 3em;` Setzt die Höhe der Listenelemente.
- `padding-left: 2em;` und `padding-right: 2em;`: Fügt innerhalb der Listenelemente einen Abstand links und rechts hinzu.
- `border: none;` Entfernt den Rahmen um jedes Listenelement.

```
.ddItem:hover
```
- Diese Klasse wird angewendet, wenn der Benutzer mit der Maus über ein Listenelement fährt (Hover-Effekt).
- `background-color: #0023e0;` Ändert den Hintergrund des Listenelements auf einen blauen Farbton.
- `transform: scale(1.05);` Vergrößert das Listenelement leicht, um einen visuellen Effekt zu erzeugen.
