## Wie man die Webseite zum Veröffentlichen baut

Unfertig!!!

`npm run dev` ist nur zur Entwicklung gut. Um die Webseite zu veröffentlichen,
geht man wie folgt vor.

Zuerst muss `serve` installiert werden.

```bash
npm install -g serve
```

Dann muss die Website gebaut werden. Dafür nutzt man

```bash
npm run build
```

im frontend-Verzeichnis.

Anschließend wollen wir die Website ausführen. Dafür brauchen wir serve. Der vorherige
Befehl sollte einen Ordner namens "dist" erzeugt.
Führe dann den folgenden Befehl aus:

```bash
serve -s dist
```
