## Doku zu Login.module.css 

```
.center
```

Das .center zentriert den Inhalt sowohl horizontal als auch vertikal auf der Seite. Es hat einen halbtransparenten Hintergrund, abgerundete Ecken und einen leichten Schatten. 

```
.center::before
```

Fügt einen dekorativen Strich oben im .center hinzu. Positioniert in der Mitte, mit einer Breite von 100px und einer Höhe von 4px.

```
.header
```

Gestaltet Überschriften im Container. Setzt den Text dunkelblau und fügt Abstand nach unten hinzu.

```
.inputContainer
```

Umhüllt Eingabefelder und positioniert Labels. Relativ positioniert, um Labels über Eingabefeldern zu platzieren.

```
.input
```

Gestaltet die Eingabefelder (Text und Passwort). 100% Breite, abgerundete Ecken, und ein weicher Übergangseffekt. Fokusfarbe wird beim Aktivieren blau.

```
.input:focus + .label, .input:valid + .label
```

Verändert das Label, wenn das Eingabefeld fokussiert oder ausgefüllt ist. Das Label wird kleiner und verschiebt sich nach oben.

```
.input[type="password"]
```

Gleiche Stile wie .input, speziell für Passwortfelder.

```
.pass
```

Link für Passwort-Optionen (z.B. "Passwort vergessen").

```
.signupLink
```

Link für die Anmeldung/Registrierung. Zentriert, mit blauer Farbe.

```
.container
```

Zentriert den gesamten Inhalt auf der Seite mit Flexbox. Sowohl horizontal als auch vertikal zentriert.