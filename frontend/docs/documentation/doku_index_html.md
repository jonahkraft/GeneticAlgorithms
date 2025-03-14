### Dokumentation der HTML-Struktur für die React-App

Diese HTML-Datei bildet die Basis für die React-Anwendung und lädt alle notwendigen Ressourcen.

```
<!doctype html>  
<html lang="en">  
```
- Der `<!doctype html>`-Tag definiert das Dokument als HTML5.
- `lang="en"` legt die Sprache der Webseite auf Englisch fest.

```
<head>  
    <meta charset="UTF-8" />  
```
`UTF-8` wird als Zeichenkodierung festgelegt.

```
    <link rel="stylesheet" href="src/index.css">  
```
Verknüpft die Datei `index.css`, um das Design und Layout der Seite zu bestimmen.

```
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">  
```
Legt das Favicon der Webseite auf eine SVG-Datei fest, die im Browser-Tab erscheint.

```
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
```
Stellt sicher, dass die Seite auf mobilen Geräten richtig skaliert wird.

```
    <title>GeneticAlgorithms</title>  
```
Der Titel der Webseite, der im Browser-Tab angezeigt wird.

```
<body>  
    <div id="root"></div>  
```
Das `<div>`-Element mit `id="root"` dient als Container, in den React seine Komponenten rendert.

```
    <script type="module" src="src/main.tsx"></script>  
```
Lädt die Datei `main.tsx`, die die React-Anwendung initialisiert.
`type="module"` stellt sicher, dass moderne JavaScript-Module verwendet werden.

---


