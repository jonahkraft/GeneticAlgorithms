## Dokumentation der Datei MakeDropDown.tsx

```
import React from 'react';
import { Subtract } from 'utility-types';
import CallBack from './CallBack';
```

React: Wird für die Erstellung des HOCs und der zustandsbehaftete Komponenten verwendet

Subtract: Entfernt die InjectedCounterProps aus den übergebenen Props um Kollisionen zu vermeiden

CallBack: Wird als Callback-Mechanismus genutzt um Aktionen auszulösen

```
export interface InjectedCounterProps {
  onChange(): void;
  open: boolean;
  text: string[];
  callBack: CallBack;
}
```
InjectedCounterProps definiert die Eigenschaften, die von makeDropDown in eine Komponente hinzugefügt werden.

```onChange()``` ist eine Funktion, die dem Zustand open/closed des Dropdownmenüs umschaltet

```open``` gibt an ob das DropdownMenü aktuell geöffnet ist

```text``` Eine Liste von Strings, die als Auswahlmöglichkeiten im Dropdown angezeigt werden

```callBack``` Eine instanz der Klasse CallBack, welche eine doWork(index) Methode bereitstellt. Diese wird aufgerufen wenn der Nutzer eine Generation auswählt

```
interface MakeDropDownProps {
  text?: string[];
  callBack: CallBack;
}
```
Die Variable text beschreibt eine Optionale Liste für die Dropdown-Einträge. 
CallBack beschreibt eine CallBack-Instanz zur Weiterverarbeitung von Ergebnissen

```
interface MakeCounterState {
  open: boolean;
}
```
MakeCounterState definiert den internen Zustand der Klasse MakeCounter.

open gibt an ob das DropdownMenü geöffnet ist.

```
const makeDropDown = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) => class MakeCounter extends React.Component<
  Subtract<P, InjectedCounterProps> & MakeDropDownProps,
  MakeCounterState
> {
```
Hier wird InjectedCounterProps genutzt, um die Steuerung des Dropdowns einfach in die Komponente zu integrieren.
MyDropdown erbt aus der InjectedCounterProbs.
```makeDropDown``` ist eine generische Funktion, die eine Komponente ```Component``` als Parameter erhält.
```P extends InjectedCounterProps```: Stellt sicher, dass die übergebene Komponente die notwendigen Props erhält.
```MakeCounter``` ist eine Klasse, die den Zustand open verwaltet und die Steuerlogik bereitstellt

```
state: MakeCounterState = {
open: false,
};
```
Der Zustand wird mit ```open: false``` initialisiert, damit das Dropdown Standardmäßig geschlossen ist

``` 
  change = () => {
      this.setState(prevState => ({
        open: !prevState.open
      }))
    }
```

Funktion welche den open-Status zwischen true und false wechselt, wenn der Nutzer das Dropdown öffnet oder schließt.

#### Die Render Methode

```
    render() {
      console.log(typeof callBack);
      console.log(callBack);
      return (
        <Component
          {...props as P}
          text={text}
          callBack={callBack}
          open={this.state.open}
          onChange={this.change}
        />
      );
    }
```
Die render-methode extrahiert text und callBack aus den props, der Rest wird in 
...props gespeichert. Zusätzlich loggt sie den Typ und Wert von callBack zur Fehlerdiagnose und
gibt Component zurück indem er text,callBack und open als probs weitergibt und onChange als Event-Handler übergibt
Die Methode erstellt also das UI basierend auf state und prop und wird automatisch erneut aufgerufen, wenn sich state oder props verändert.
