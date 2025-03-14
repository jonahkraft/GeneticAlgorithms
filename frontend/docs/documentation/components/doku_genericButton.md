### Dokumentation für Generic Buttons

Generic Buttons ist eine Komponente welche für
den genormten Button sorgt.

#### Import

```
import styles from './GenericButton.module.css';
```
styles beschreibt den Style des genormten Buttons

#### Interface

```
interface Probs{

title: string;

onClick:() =>void;

idd: string;
}
``` 
Probs ist ein Interface welches die Struktur fpr title und onClick festlegt.
title beschreibt den Text welcher auf dem Button angezeigt wird, onClick beinhaltet die Funktion welche der Button ausführen soll. Die id hilft beim schreiben von automatisierten Tests, den Button einfacher zu finden/klicken.

#### Funktionen

```
function GenericButton({ title,onClickn,idd}):Probs){}
```

Die Funktion nimmt die Variablen title, onClick und id und gibt einen HTML button zurück mit dem gewünschten Titel, id und der gewünschten Funktion.

```
return(
<button className={styles.GenericButton} onClick={onClick}>{title} id{}</button>
      )
```
Rückgabe des gewünschten Buttons in HTML