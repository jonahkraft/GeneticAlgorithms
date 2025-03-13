## Dokumentation für Main.tsx
```
import { createRoot } from 'react-dom/client'
```
Importiert createRoot, um die React Anwendung in den DOM zu rendern.

```
import App from './App';
```
Importiert App, die zentrale react-Komponente, die die gesamte Anwendung enthält.

```
createRoot(document.getElementById('root')!).render(
    <App/>
)
```
hier wird ein Root-Instanz erstellt und die App-komponente in diese reingerendert.