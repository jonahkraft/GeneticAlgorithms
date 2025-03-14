### Dokumentation für das CSS der Hauptinhalte

```
.wrapper
```
Der Wrapper hat eine minimale Höhe von `100vh`, sodass der gesamte Bildschirmplatz genutzt wird, selbst wenn der Inhalt weniger als die Höhe des Bildschirms beträgt.

```
.mainContent
```

- Text-Ausrichtung: Der Text im Container wird zentriert (`text-align: center`).
- Padding: Es gibt ein `50px 20px` Padding, um ausreichend Platz um den Inhalt zu schaffen.
- Hintergrund: Der Hintergrund ist weiß.
- Border-Radius: Die Ecken sind mit einem Radius von `10px` abgerundet.
- Box-Schatten: Ein leichter Schatten.
- Margin: Der Container hat `margin-top: 5%`, was ihn leicht nach unten verschiebt, und `margin: 0 auto` für zentrierte horizontale Ausrichtung.
- Breite und Maximalbreite: Die Breite ist auf `80%` gesetzt, mit einer maximalen Breite von `900px`, um sicherzustellen, dass der Inhalt nicht zu breit wird.
- Positionierung: Die Position ist `relative`.

```
.header
```
- Hintergrund: Der Hintergrund des Headers wird mit einem linearen Farbverlauf von `#567df4` zu `#9e86ff` gestaltet.
- Text-Clip: Der Text wird mit `-webkit-background-clip: text` so bearbeitet, dass der Farbverlauf nur auf den Text angewendet wird.
- Text-Farbe: Der Text wird mit `-webkit-text-fill-color: transparent` unsichtbar gemacht, wodurch der Hintergrund durchscheint.
- Schriftgröße: Die Schriftgröße des Headers beträgt `4rem`.
- Abstand: Ein negativer `margin-bottom: -35px` sorgt dafür, dass der Header etwas nach oben verschoben wird.

```
.subheader
```
- Schriftgröße: Die Schriftgröße des Subheaders beträgt `1.8rem`.
- Schriftgewicht: Der Text wird mit `font-weight: 300` etwas dünner gemacht.
- Textfarbe: Der Text hat eine graue Farbe mit.

```
.introText
```
- Text-Ausrichtung: Der Text ist linksbündig (`text-align: left`).
- Schriftgröße: Die Schriftgröße beträgt `1.1rem`.
- Textfarbe: Die Textfarbe ist ebenfalls `#4f5b66`.
- Padding und Margin: Ein `padding-left: 20px` und `margin-right: 20px` schaffen genügend Platz um den Text. Zusätzlich gibt es ein `margin-top: 100px`, um den Text weiter nach unten zu verschieben.
- Zeilenhöhe: Die Zeilenhöhe beträgt `1.6`.

```
.pictureContainer
```
- Farbgestaltung: Der Container hat eine Textfarbe von `#4f5b66`.
- Flexbox-Layout: Das Container-Element wird als Flexbox dargestellt, mit `justify-content: center` und `align-items: center`, was den Inhalt sowohl horizontal als auch vertikal zentriert.
- Größe: Die Größe des Containers wird automatisch angepasst (`width: auto; height: auto`).

```
.faq
```
- Padding: Der Container hat ein `padding: 20px`, was den Inhalt vom Rand des Containers fern hält.
- Hintergrund: Der Hintergrund ist weiß.
- Border-Radius und Box-Schatten: Mit einem `border-radius: 10px` und einem `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)` erhält der Container eine abgerundete Form und einen leichten Schatten.
- Breite und Maximalbreite: Die Breite beträgt `80%`, mit einer maximalen Breite von `900px`, und der Container ist zentriert.
- Farbe: Die Textfarbe wird auf `#333333` gesetzt.

```
.smallHeader
```
- Textfarbe: Die Textfarbe des kleinen Headers ist auf `#2c3e50` gesetzt.
- Schriftgröße: Der Header hat eine Schriftgröße von `1.8rem`.
- Abstand: Es gibt einen `margin-bottom: 15px`, um ausreichend Platz nach unten zu schaffen.

```
.details
```
- Hintergrundfarbe: Die Hintergrundfarbe ist ein heller Grauton.
- Padding und Margin: Das Element hat ein Padding von `15px` und `margin: 10px 0`, um Platz um den Inhalt zu schaffen.
- Border-Radius: Die Ecken sind mit `border-radius: 5px` abgerundet.

```
.summary
```
- Schriftgewicht: Der Text ist fett (`font-weight: bold`).
- Cursor: Der Cursor wird mit `cursor: pointer` als Hand-Cursor angezeigt, um anzuzeigen, dass das Element interaktiv ist.

```
.detailsText
```
- Textfarbe: Der Text hat eine Farbe von `#607d8b`.
- Abstand: Ein `margin-top: 5px` sorgt für etwas Platz nach oben, um den Text zu trennen.

```
.fullWidthImage
```
- Breite: Das Bild nimmt die volle Breite des Containers ein (`width: 100%`).
- Höhe: Die Höhe des Bildes wird automatisch an die Breite angepasst (`height: auto`).
- Anzeige: Das Bild wird als Block-Element angezeigt (`display: block`), wodurch es den gesamten verfügbaren Raum ausnutzt.
