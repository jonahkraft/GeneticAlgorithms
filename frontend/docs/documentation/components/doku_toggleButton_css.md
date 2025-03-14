## Dokumentation für das css für die toggleButton.module.css

### Credit:
Diese Komponente wurde von der Website universe.io übernommen, von dem User mrhydden.

https://uiverse.io/mrhyddenn/old-fish-66


Die Datei ToggleButton.module.css definiert das Styling für den ToggleButton

```
.switch
```
Für die Box welche um den ToggleButton herum ist wird die Schriftgröße, sowie
die Position der gesamten box festgelegt und wie grpß die Box ist.


```
.switch input
```
Hier wird die Standard-HTML-Checkbox ausgeblendet

```
.slider 
```
Die Klasse stylt das Slider-Element des Schalters mit welchem der Nutzer interageirt.
Der Slider wird innterhalb des .switch containers positioniert sowie dass der Gesamte Raum des -switch Containers eingenmmen wird.


```
.slider:before 
```
Erzeugt den kleinen kreisförmigen Kreis im Slider, der sich bewegt, wenn er umgeschaltet wird.
Hier wird der Kreis links in den slider gesetzt, also die Position des Knopfs bei dem inaktiven Schalter



```
input:checked + .slider 
```
Definiert den Stil für den Slider wenn das Kontrolkästchen aktiviert ist, also ändert die Farbe des Hintergrund und
entfernt den Rand des Sliders


```
input:checked + .slider:before 

```
Stellt sicher dass wenn der Knopf aktiviert wurde der Kreis nah recchts geschoben wird.

### Zusammenfassung:

Der Schalter erscheint mit weißem Hintergrund und einem kleinen weißen Knopf links im Slider, bei Inaktivität.

Der Schalter erscheint mit dunklem Hintergrund und der Knopf bewegt sich nach rechts, bei Aktivität.
