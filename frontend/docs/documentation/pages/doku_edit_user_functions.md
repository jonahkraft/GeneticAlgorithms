### Dokumentation für edit_user_function.ts

```
function changeUsername() {}
```
Diese Funktion sendet eine Anfrage an den Server, um den Benutzernamen zu ändern. Sie nimmt den alten und den neuen Benutzernamen entgegen und führt einen POST-Request mit dem Authentifizierungstoken aus. Bei einem Fehler wird eine Fehlermeldung ausgegeben.

```
function changeUserRole {}
```
Diese Funktion ändert die Rolle eines Benutzers. Sie nimmt den Benutzernamen und die neue Rolle entgegen und sendet einen POST-Request mit dem Authentifizierungstoken, um die Rolle zu ändern. Bei einem Fehler eine Fehlermeldung.

```
function changePassword() {}
```
Diese Funktion ändert das Passwort eines Benutzers. Sie nimmt den Benutzernamen, das alte und das neue Passwort entgegen und sendet einen POST-Request mit dem Authentifizierungstoken, um das Passwort zu ändern. Bei einem Fehler eine Fehlermeldung.