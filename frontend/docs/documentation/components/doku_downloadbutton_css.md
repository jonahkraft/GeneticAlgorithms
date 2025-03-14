### Dokumentation für CSS des VisualizationButton

Das CSS für den VisualizationButton implementiert das Design und die Interaktivität eines interaktiven Schalters, der mit verschiedenen Animationen versehen ist, um das Benutzererlebnis zu verbessern.

```
.container
```
- Positionierung: Der Container ist mit Flexbox zentriert (horizontal und vertikal).
- Größe: Keine feste Größe, wird durch die Kinder-Elemente bestimmt.
- Design: Die Schriftart ist auf Arial, Helvetica oder sans-serif gesetzt.
- Verhalten: Der Container wird auf 100% der Höhe und Breite des Parent-Elements ausgedehnt.

```
.label
```
- Positionierung: Das Label ist als flexibles Container-Element positioniert, um die enthaltenen Elemente zu zentrieren.
- Größe: Breite von 160px und abgerundete Ecken (50px Radius).
- Design: Der Rahmen ist mit einer blauen Farbe (`rgb(91, 91, 240)`) versehen. Der Hintergrund ist transparent.
- Interaktivität: Der Cursor wird auf "pointer" gesetzt, um die Klickbarkeit des Labels anzuzeigen.
- Übergänge: Ein sanfter Übergang von 0.4 Sekunden wird auf alle Eigenschaften angewendet, die sich ändern .

```
.label::before
```
- Design: Erzeugt ein kleines, unsichtbares rundes Pseudo-Element, das zunächst nicht sichtbar ist und bei Interaktion eingeblendet wird.
- Positionierung: Es ist absolut innerhalb des Labels positioniert und zentriert.
- Farbe: Hintergrundfarbe auf schwarz gesetzt.
- Übergang: Ein sanfter Übergang wird auf alle Eigenschaften angewendet.

```
.label .input
```
- Versteckt: Das `input`-Element wird ausgeblendet, da der Benutzer nur mit dem Label interagiert.
- Display: Es wird auf "none" gesetzt, sodass der Benutzer den Schalter durch das Label steuert.

```
.label .title
```
- Design: Der Titeltext im Label hat eine Schriftgröße von 17px und ist in Schwarz.
- Positionierung: Der Titel ist absolut rechts im Label positioniert.
- Verhalten: Der Text wechselt beim Klicken, wobei der "installierte" Text nach der Interaktion sichtbar wird.

```
.labe .circle
```
- Größe: Der Kreis hat einen festen Radius von 45px.
- Design: Der Kreis ist mit einer blauen Farbe hinterlegt.
- Verhalten: Das Element ist zentral im Label positioniert und wird durch die Animationen verändert.
- Animationen: Es wird eine sanfte Animation auf alle visuellen Änderungen des Kreises angewendet, z. B. beim Wechseln der Farbe oder beim Skalieren.

```
.circle .icon
```
- Design: Das Icon innerhalb des Kreises ist weiß und hat eine feste Breite von 30px.
- Positionierung: Das Icon wird exakt in der Mitte des Kreises positioniert.
- Verhalten: Bei Aktivierung wird das Icon unsichtbar.

```
.circle .square
```
- Design: Ein kleines Quadrat im Kreis, das anfangs unsichtbar ist.
- Größe: Das Quadrat hat eine feste Größe von 15px mit abgerundeten Ecken.
- Verhalten: Das Quadrat wird bei Aktivierung des Schalters sichtbar und sorgt für visuelles Feedback.

```
@keframes pulse
```
Diese Animation sorgt für einen pulsierenden Effekt des Kreises. Der Kreis wird leicht vergrößert und erhält einen Schlagschatten, der dann wieder verschwindet.

```
@keframes installing
```
Diese Animation simuliert eine Installationsphase, bei der die Höhe des Kreises von 0 auf 100% wächst, um visuell eine "Installation" darzustellen.

```
@keaframes rotate
```
Der Kreis wird um 270 Grad gedreht, während er sich in der Animation bewegt.

```
@keyframes installed
```
Die Breite des Labels wächst von der ursprünglichen Größe auf 150px, und der Rahmen des Labels wird grün, um den erfolgreichen Abschluss der Aktion darzustellen.

```
@keyframes circleDelete
```
Diese Animation sorgt dafür, dass das Icon im Kreis nach der Aktivierung des Schalters verschwindet, um Platz für das Quadrat zu machen.

```
@keyframes showInstalledMessage
```
Diese Animation sorgt dafür, dass der Text, der den "Installationsabschluss" anzeigt, nach dem Umschalten eingeblendet wird und an der richtigen Position im Label erscheint.


