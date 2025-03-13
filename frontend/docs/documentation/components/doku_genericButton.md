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
}
``` 
Probs ist ein Interface welches die Struktur fpr title und onClick festlegt.
title beschreibt den Text welcher auf dem Button angezeigt wird, onClick beinhaltet die Funktion welche der Button ausführen soll.

#### Funktionen

```
function GenericButton({ title,onClick}):Probs){}
```

Die Funktion nimmt die Variablen title und onClick und gibt einen HTML button zurück mit dem gewünschten Titel und der gewünschten Funktion.

```
return(
<button className={styles.GenericButton} onClick={onClick}>{title}</button>
      )
```
Rückgabe des gewünschten Buttons in HTML