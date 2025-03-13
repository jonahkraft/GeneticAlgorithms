### Dokumentation für CSS der Header

Das CSS für die Header- und Navbar-Komponenten sorgt für eine benutzerfreundliche, gut strukturierte Navigationsleiste.

```
.header
```
- Die `header`-Komponente hat eine Breite von 100% und einen weißen Hintergrund.
- Die Positionierung ist `fixed`, um sicherzustellen, dass die Navbar beim Scrollen oben bleibt.
- Der `top`-Wert ist auf `0` gesetzt, damit der Header immer oben angezeigt wird.
- Der `z-index` ist auf `1000` gesetzt, um die Navbar über anderen Elementen anzuzeigen.
- Die Textfarbe ist schwarz und das Padding sorgt für Abstände von `10px` oben und unten sowie `20px` links und rechts.
- Ein leichter `box-shadow` gibt der Navbar einen Schatten.
- Die Schriftart ist auf Helvetica, Arial oder sans-serif gesetzt.

```
.navbar
```
- Die `navbar` verwendet Flexbox, um ihre Elemente zu arrangieren.
- Sie nutzt `align-items: center`, um die Items vertikal zu zentrieren, und `justify-content: space-between`, um die Items am Rand zu verteilen.
- Die `flex-wrap`-Eigenschaft ermöglicht es, dass die Navbar in mehreren Zeilen angezeigt wird, wenn der Platz nicht ausreicht.

```
.logo
```
- Das Logo ist ein flexibles Container-Element, das sowohl vertikal als auch horizontal zentriert wird.
- Die Schriftgröße des Logos ist auf `28px` gesetzt, und die Schrift ist fett (`font-weight: bold`).
- Es gibt keinen Text-Unterstrich (`text-decoration: none`), und die Textfarbe ist schwarz.
- Ein Abstand von `10px` wird rechts hinzugefügt.


```
.navbarList
```
- Die Navbar-Liste nutzt ebenfalls Flexbox mit `justify-content: center`, um die Links horizontal zu zentrieren.
- `flex-grow: 1` sorgt dafür, dass die Liste den verfügbaren Platz einnimmt, und `margin: 0` sowie `padding: 0` entfernen unnötige Abstände.
- Die `list-style-type: none` entfernt die Standard-Aufzählungszeichen.


```
.navbarListItem
```
- Jedes Listen-Item der Navbar hat `margin: 0 15px` für horizontalen Abstand zwischen den Elementen und `padding: 10px 15px` für etwas inneren Abstand.
- Die Schriftgröße ist auf `16px` gesetzt, und die Textfarbe ist schwarz.
- Ein sanfter Übergangseffekt für die Farbe wird mit einer Dauer von 0.4s definiert, der auf das Hover-Verhalten angewendet wird.

```
.navbarListItem:hover
```
- Beim Hover ändert sich die Textfarbe zu einem Blauton.

```
@media
```
- Wenn die Bildschirmbreite weniger als `768px` beträgt, wird die Navbar von einer horizontalen zu einer vertikalen Ausrichtung geändert (`flex-direction: column`).
- Die Navbar-Items werden in einer Spalte ausgerichtet, wobei jedes Item die gesamte Breite einnimmt.
- Es wird auch ein Padding von `10px 20px` für die Links gesetzt.


```
@media
```
- Wenn der Benutzer den hellen Farbmodus bevorzugt (`prefers-color-scheme: light`), werden die Textfarbe und der Hintergrund auf entsprechende Werte angepasst (`#213547` und `#ffffff`).
- Die Navbar-Item-Farbe beim Hover wird ebenfalls auf `#1E90FF` geändert, und die Hintergrundfarbe des Buttons wird auf `#f9f9f9` gesetzt.

