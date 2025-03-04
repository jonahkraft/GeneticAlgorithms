## How to Website starten

Wichtig: IDEs wie Webstorm bieten einen "run"-Button, um Webseiten zu starten. Dieser funktioniert jedoch nicht, 
da die Website über einen Node-Server läuft.

Um die Website zu starten und sicherzustellen, dass Code über react korrekt gerendert wird, geht man folgendermaßen vor:

Stelle das working directory auf den frontend Ordner ein.
Falls du dich grade in diesem Verzeichnis befindest, geht das so:
```bash
cd ..
```
Ansonsten `..` durch den Pfad ersetzen.

Führe anschließend den folgenden Befehl aus:

```bash
npm run dev
```

Dann sollte ein localhost-Link in das Terminal geprintet werden, der zur Website führt. Dieser Link kann dann in einem
Browser geöffnet werden.