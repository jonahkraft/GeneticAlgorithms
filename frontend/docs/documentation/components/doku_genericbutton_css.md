### Dokumentation für CSS des GenericButton

Das CSS für den GenericButton implementiert das Design eines klickbaren Buttons mit einem Hover-Effekt.

```
.GenericButton
```
- Der Button hat abgerundete Ecken mit einem Radius von 1.5em.
- Die Schriftfarbe ist weiß, und der Hintergrund ist in einem dunklen bläulichen Farbton.
- Ein weißer Rahmen von 2px wird um den Button gezogen.
- Die Höhe des Buttons beträgt 3em.
- Der Button erhält zusätzlich links und rechts 2em Padding, um den Text vom Rand zu entfernen und ihm Platz zu geben.

```
.GenericButton:hover
```
- Wenn der Benutzer mit der Maus über den Button fährt, ändert sich die Hintergrundfarbe zu einem hellen blauen Farbton.
- Der Button wird leicht vergrößert durch die `scale(1.05)`-Transformation, was den Button visuell hervorhebt.
