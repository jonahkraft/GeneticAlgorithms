### Dokumentation Test Cases für Endprodukt
Diese Python Dateien wurden alle genutzt, um die automatisierte Tests für den Vertikalen Prototypen zu schreiben. Die Tests wurden mit Hilfe von Selenium, einer python Bibliothek, geschrieben und ausgeführt. Um höhere Kompatibilität zu gewährleisten können die Tests in Safari, sowie Google Chrome ausgeführt werden.

```
AdminAddUser.py
```
Dieser Test soll zeigen, dass Admins neue User registrieren können.
1. User versucht sich mit Daten anzumelden, die noch nicht in der Datenbank hinterlegt sind.
2. Nun meldet sich der Admin an und geht in die Einstellungen, um den User mit den zuvor genutzen Daten manuell zu registrieren.
3. Der Admin meldet sich ab und der User versucht es erneut.
4. Diesmal ist der Login erfolgreich.

```
AdminRemoveUser.py
```
Dieser Test soll zeigen, dass Admins vorhandene Useraccounts manuell löschen können.
1. User meldet sich mit seinen Daten an, um zu zeigen, dass der Account in der Datenbank hinterlegt ist.
2. Nun meldet sich der User ab und ein Admin loggt sich ein.
3. Der Admin geht nun in die Einstellungen und löscht den zuvor eingeloggten User aus der Datenbank.
4. Der User versucht erneut sich mit seinen zuvor genutzten Daten einzuloggen, nur diesmal werden die Eingabedaten abgelehnt.

```
AdminEditUser.py
```
Test soll zeigen, dass Admins vorhandene Userdaten bearbeiten können
1. User meldet sich mit seinen Daten an, um zu zeigen, dass der Account in der Datenbank hinterlegt ist.
2. Nun meldet sich der User ab und ein Admin loggt sich ein.
3. Admin geht nun in die Einstellungen und gibt den Alten Username und danach den neuen Username und ein neues passwort ein.
4. Nachdem er auf den Apply-Button drückt meldet er sich ab.
5. Der User versucht erneut sich mit seinen alten Userdaten anzumelden, nur diesmal nicht erfolgreich.
6. User versucht es erneut mit den neuen Daten, die der Admin zuvor festgelegt hatte. -> Diesmal erfolgreich.






