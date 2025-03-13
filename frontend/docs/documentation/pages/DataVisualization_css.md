# Dokumentation zur CSS-Struktur

Die Klasse `.wrapper` sorgt dafür, dass die gesamte Seite mindestens die volle Höhe des Viewports einnimmt. Dies stellt sicher, dass der Inhalt sich immer an die Bildschirmhöhe anpasst.

```css
.wrapper {
  min-height: 100vh;
}
```

Die Klasse `.mainContent` definiert das Hauptinhaltselement. Es ist mittig ausgerichtet, hat einen weißen Hintergrund, abgerundete Ecken und einen leichten Schatten, um sich optisch vom Hintergrund abzuheben.

```css
.mainContent {
  text-align: center;
  padding: 50px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto; 
  margin-top: 5%; 
  width: 80%;
  max-width: 900px;
  position: relative;
  top: 0;
}
```

Die Klasse `.header` definiert die Hauptüberschrift mit einem Farbverlauf. Durch `-webkit-background-clip: text;` und `-webkit-text-fill-color: transparent;` wird der Verlauf nur auf den Text angewendet.

```css
.header {
  background: linear-gradient(135deg, #567df4, #9e86ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 4rem;
  margin-bottom: -35px;
}
```

Die Klasse `.subheader` stellt eine Unterüberschrift dar, die farblich etwas dezenter ist.

```css
.subheader {
  font-size: 1.8rem;
  font-weight: 300;
  color: #4f5b66;
}
```

Die Klasse `.introText` wird für eine Einleitung oder Beschreibung genutzt. Der Text ist linksbündig und hat eine angenehme Zeilenhöhe für bessere Lesbarkeit.

```css
.introText {
  text-align: left;
  font-size: 1.1rem;
  color: #4f5b66;
  padding-left: 20px;
  margin-right: 20px;
  margin-top: 100px;
  line-height: 1.6;
}
```

Die Klasse `.faq` formatiert einen Container für häufig gestellte Fragen. Sie hat abgerundete Ecken, einen Schatteneffekt und eine maximale Breite von 900px.

```css
.faq {
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  color: #333333;
  max-width: 900px;
  margin: 40px auto;
}
```

Die Klasse `.smallHeader` definiert eine kleinere Überschrift, die in dunklerem Blau gehalten ist.

```css
.smallHeader {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 15px;
}
```

Die Klasse `.details` hebt bestimmte Bereiche optisch hervor, indem sie einen leicht blauen Hintergrund und eine Innenabstände erhält.

```css
.details {
  margin: 10px 0;
  background-color: #f4f6fb;
  padding: 15px;
  border-radius: 5px;
}
```

Die Klasse `.pictureContainer` wird genutzt, um Bilder flexibel und zentriert anzuzeigen.

```css
.pictureContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}
```

Die Klasse `.image` sorgt dafür, dass Bilder sich der Containerbreite anpassen.

```css
.image {
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
}
```

Die Klasse `.fullWidthImage` stellt sicher, dass ein Bild die gesamte verfügbare Breite einnimmt.

```css
.fullWidthImage {
  width: 100%;
  height: auto;
  display: block;
}
```

