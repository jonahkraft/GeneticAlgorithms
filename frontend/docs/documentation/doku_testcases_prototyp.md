### Dokumentation Test Cases für Prototypen
Diese Python Dateien wurden alle genutzt, um die automatisierte Tests für den Horizontalen Prototypen zu schreiben. Die Tests wurden mit Hilfe von Selenium, einer python Bibliothek, geschrieben und ausgeführt. Um höhere Kompatibilität zu gewährleisten können die Tests in Safari, sowie Google Chrome ausgeführt werden.

```
aaa.py
```
Diese Python Datei enthält alle Funktionen, die für die automatisierten Tests genutz werden.
- `wait_element` wird genutzt, um mit Hilfe von `WebDriverWait` sicher zu stellen, dass die benötigten Buttons/Texte auf der Website geladen haben, bevor sie genutzt werden.
- `wait_elements` ist identisch zu  `wait_element`, der einzige Unterschied ist, dass sie nicht nur auf das Laden von ein Element, sondern allen Elemente mit der gegebenen ID warten.
- `click_button` ist eine Funktion, die `wait_element` aufruft, um sicherzustellen, dass der gewünschte Button geladen ist, bevor `driver.find_element` den gesuchten Button findet und mit `button.click` klickt.
- `test_navigation` ist eine Funktion, die einen Button klickt und daraufhin den gewünschten Text überprüft. Dies soll sicher stellen, dass der Button den gewünschten Effekt hat.
- `initialize_driver1` nutzt webdriver.Safari, um Safari zu öffnen und danach .get(), um den richtigen Weblink zu unserer Seite zu öffnen.
- `initialize_driver2` ist identisch zu `initialize_driver1`, nur dass dieser Chrome öffnet.

```
DataInputTest.py
```
Dieser Test geht auf die Data Visualization Seite, um dort Werte für die Eingabefelder einzugeben. Danach klickt er auf `Start Simulation` und überprüft, ob die eingegebenen Werte auch richtig zurückgegeben werden.

```
LogoutTest.py
```
Bei diesem Test melden wir einen Nutzer an. Danach wird dieser wieder ausgeloggt und es wird geprüft, ob der User wieder auf die Home Seite weitergeleitet wird. Außerdem soll dadurch auch geprüft werden, ob bei eingeloggten Usern der Login-Button zum Logout-Button wird. 

```
NavigationTest.py
```
Dieser Test klickt jeden Button in der Navigationsbar und überprüft, ob der User auf die richtige Seite weitergeleitet wird.

```
SettingsTest.py
```
Hier wird die Funktion `test_navigation` genutzt, um die Settingsseite zu testen - wird nach drücken der Settingsbutton die richtigen Einstellungen angezeigt?

```
UsernameRightTest.py
```
Bei diesem Test melden wir uns mit einem User an und überprüfen danach in den Settings, ob der gleiche Username dort angezeigt wird.

```
UsernameUnknownTest.py
```
Hier wird überprüft, dass bei einem Gast/nichteingeloggter User keine Username angezeigt wird.

