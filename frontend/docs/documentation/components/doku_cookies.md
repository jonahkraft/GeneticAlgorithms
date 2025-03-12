## Eine chronologische Übersicht über alle Funktionen des Cookie-Moduls

#### 1. Standard-Werte

```
const standardValue
```

Eine Sammlung der Standard-Werte des Cookie-Moduls. Setzt den Nutzernamen und die
Rolle auf "could not load" und signed_in auf false.  

#### 2. Objekt-Struktur

```
interface CookieData {}
```

Gibt die Struktur der Cookie-Objekte an. Cookies enthalten 'username', 'role' und
'signed_in'.

#### 3. Cookies laden

```
function getCookies() {}
```

Nimmt kein Argument und lädt alle aktuell gespeicherten Cookies. Diese werden als Cookie-Objekt
(siehe Punkt 2) zurückgegeben.

#### 4. Cookies speichern

```
function saveCookies(obj: CookieData, days = 7) {}
```

Die übergebenen Cookies (als CookieData-Objekt, siehe Punkt 2) werden im Browser gespeichert.
Die standardmäßig verwendete Dauer ist eine Woche. Die Dauer kann manuell angepasst werden, indem sie explizit angegeben
wird. Dafür übergibt man zusätzlich zum CookieData-Objekt noch die Anzahl der Tage, für die die Cookies gespeichert werden sollen,
als int.

#### 5. Cookies löschen

```
function deleteCookies() {}
```

Die Funktion deleteCookies löscht alle derzeit im Browser gespeicherten Cookies, indem das Ablaufdatum dieser Cookies in
die Vergangenheit gesetzt wird.


