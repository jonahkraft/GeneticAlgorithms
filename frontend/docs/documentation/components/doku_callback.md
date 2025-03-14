## Dokumentation CallBack.tsx

### Klasse CallBack

```
export interface myCallBackType { 
    doWork(index: number): void 
}
```
Definiert eine Methode ```doWork``` die eine Zahl als Parameter enthält und keinen Rückgabewert hat
```
class CallBack implements myCallBackType {
    myCallBack: ((index: number) => void);
```

```CallBack``` implementiert ```myCallBackType```, sodass sie die Methode ```doWork``` bereitstellen muss.

```myCallBack``` speichert eine Callback-Funktion, die beim Aufruf von ```doWork``` ausgeführt wird.


```
    doWork(index: number)
    {
        this.myCallBack(index); 
    }
```
Diese Funktion ruft die gespeicherte Callback-Funktion mit dem übergebenen index.wert auf

```
  constructor(call: ((index: number) => void)) {
        this.myCallBack = call;
    }
```
Der Konstruktor nimmt die Funktion call als Parameter entgegen und speichert sie in ```myCallBack```.
Dadurch kann eine externe Funktion übergeben werden, welche später mit doWork(index) aufgerufen wird.


