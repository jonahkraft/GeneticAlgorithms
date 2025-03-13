### Dokumentation der Dropdown.tsx

#### Import
```
import makeDropDown, { InjectedCounterProps } from './MakeDropDown';
import style from './DropDown.module.css'
```

makeDropDown ist eine Higher-Order-Component, die zusätzliche Funktionalitäten für die Dropdown-Steuerung bereitstellt.

InjectedCounterProps definiert die erweiterten Eigenschaften, die durch makeDropDown bereitgestellt werden.

style enthält die CSS-Klassen für das Design der Komponente.

#### Eigenschaften der Komponente

```
export interface DropDownProps extends InjectedCounterProps {
    style?: React.CSSProperties;
}
```

DropDownProbs extended InjectedCounterProbs, um sicherzustellen dass alle benötigten Methoden und Zustände verfügbar sind

Style ist optional und erlaubr das Überschreiben der Standard-Styling-Eigenschaftem

#### Funktionen

```
const DropDown = (props: DropDownProps) => (
    <div className={style.wrapper}>
        <button className={style.ddSelector} onClick={props.onChange}>Select Generation</button>
        {props.open ? 
            <ul className={style.dropdownContent}>
                {props.text.map((item) => <li key={item}><button className={style.ddItem} onClick={() => {props.onChange(); props.callBack.doWork(Number(item))}}>Generation {item}</button></li>)}
            </ul> : 
            null
        }
    </div>
);
```
```<div className={style.wrapper}>:``` Im äußeren <div> Element werden alle Elemente des Dropdownmenü gruppiert.

Der ```<Button>```  dient als Umschalter für das Dropdown-Menü

Falls props.open wahr ist wird eine ```<ul>``` Liste mit ```<li>``` Elementen gerendert, welche jeweils einen Button für die Auswahl einer Generation enthalten.

Klickt man auf einen der auswählbaren Buttons:
- Die Funktion ```probs.onChance()``` aufgerufen wird, um den Zustand des Dropsdowns zu aktualisieren
- zusätzlicb wird ```probs.callBack.doWork(Number(item))``` aufgerufen, um eine Aktion mit der ausgewählten Generation auszuführen.

