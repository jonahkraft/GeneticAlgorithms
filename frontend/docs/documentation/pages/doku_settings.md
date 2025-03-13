# Dokumentation Settings

Die `Settings`-Komponente stellt die Benutzeroberfläche für die Verwaltung von Benutzereinstellungen, Darstellung (z.B. Dark Mode), Sprachzugänglichkeit und Benutzerverwaltung bereit. Die Komponente zeigt unterschiedliche Tabs, die je nach Benutzerrolle und -bedürfnissen aktiviert werden können. Sie ermöglicht es Benutzern, ihr Konto zu verwalten, das Erscheinungsbild der Anwendung zu ändern und, falls der Benutzer Administrator ist, andere Benutzer zu verwalten.

## Funktionen

### 1. Account-Einstellungen
- Benutzername anzeigen: Zeigt den aktuellen Benutzernamen an.
- Rolle anzeigen:** Zeigt die Rolle des Benutzers an (z. B. "Administrator").
- Passwort ändern: Ermöglicht dem Benutzer, das Passwort zu ändern. Ein Pop-up-Fenster wird angezeigt, in dem das alte und neue Passwort eingegeben werden müssen.
- Konto löschen: Bietet die Möglichkeit, das Konto zu löschen.

### 2. Erscheinungsbild (Dark Mode)
- Dark Mode aktivieren: Der Benutzer kann den Dark Mode über den `DarkModeButton` umschalten.

### 3. Sprachzugänglichkeit
- Easy Speech: Ermöglicht es Benutzern, die Sprache auf einfache Sprache umzustellen. Die `ToggleButton`-Komponente wird verwendet, um diese Einstellung zu ändern.

### 4. Benutzerverwaltung (nur für Administratoren)
- Benutzer hinzufügen: Ein Formular ermöglicht es Administratoren, einen neuen Benutzer hinzuzufügen, einschließlich Benutzername, Passwort und Rolle.
- Benutzer löschen: Administratoren können einen Benutzer durch Eingabe des Benutzernamens löschen.
- Benutzer bearbeiten: Administratoren können Benutzernamen, Passwörter und Rollen von bestehenden Benutzern ändern.

## Zustand und Daten

Die Komponente nutzt mehrere State-Variablen, um die Benutzereingaben und die angezeigten Daten zu verwalten:

- `selectedTab`: Verfolgt den aktuell ausgewählten Tab.
- `users`: Speichert eine Liste aller Benutzer (nur für Administratoren sichtbar).
- `username`, `password`, `roleSet`: Speichern die Eingabedaten für das Hinzufügen eines neuen Benutzers.
- `userToBeDeleted`: Speichert den Benutzernamen des Benutzers, der gelöscht werden soll.
- `oldName`, `newName`, `newPW`, `newRole`: Speichern die Eingabedaten für die Bearbeitung eines Benutzers.
- `isPopupVisible`: Steuert die Sichtbarkeit des Pop-ups zum Ändern des Passworts.

## Funktionen
```
addUser()
```
- Sendet eine Anfrage an den Server, um einen neuen Benutzer zu erstellen.
- Erfolgreiches Hinzufügen eines Benutzers aktualisiert die `users`-Liste.

```
deleteUser()
```
- Sendet eine Anfrage an den Server, um einen Benutzer zu löschen.
- Erfolgreiches Löschen eines Benutzers entfernt den Benutzer aus der `users`-Liste.

```
editUserAdmin()
```
- Bearbeitet einen Benutzer, indem der Benutzername, das Passwort und/oder die Rolle geändert werden.
- Ruft die `loadUsers`-Funktion auf, um die aktualisierte Benutzerliste zu laden.

```
togglePopup()
```
- Schaltet die Sichtbarkeit des Passwortänderungs-Popups um.

```
handleTabClick()
```
- Wechselt zwischen den Tabs der Einstellungen (Account, Appearance, Accessibility, User Management).

## API-Endpunkte

- **POST `/api/register`:** Registriert einen neuen Benutzer.
- **POST `/api/delete_user`:** Löscht einen bestehenden Benutzer.

## Externe Abhängigkeiten

- Axios: Wird für HTTP-Anfragen an den Server verwendet (z. B. zum Hinzufügen, Löschen und Bearbeiten von Benutzern).
- React Router: Wird für die Navigation zwischen verschiedenen Routen (z. B. zum Weiterleiten von Benutzern zu `/login`, wenn sie nicht eingeloggt sind) verwendet.
- Cookies: Wird verwendet, um den aktuellen Benutzerstatus zu verfolgen und Token für Authentifizierungsanfragen bereitzustellen.


