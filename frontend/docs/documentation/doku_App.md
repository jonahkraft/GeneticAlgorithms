### Dokumentation für App.tsx
Die Datei App.tsx definiert die Routen sowie die Struktur der Seite. Sie zeigt die Hauptkomponenten wie Header, Footer und die jeweiligen Seiten an.
```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
```
Importiert Komponenten, die die Navigation innerhalb der App ermöglichen
```
import Home from "./pages/Home/Home.tsx";
import DataVisualization from "./pages/DataVisualization/DataVisualization.tsx";
import Login from "./pages/Login/Login.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
```
Importiert alle wichtigen Komponenten die zusammen die Website ergeben.
```
function App()
```
Die funktion definiert die Routen der Anwendung und rendert je nach ausgewählter Route die entsprechende Seite.