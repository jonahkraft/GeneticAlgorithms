import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import DataVisualization from "./pages/DataVisualization/DataVisualization.tsx";
import Login from "./pages/Login/Login.tsx";
import Settings from "./pages/Settings/Settings.tsx";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/data_visualization" element={<DataVisualization/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/settings" element={<Settings/>}></Route>
            </Routes>
        </Router>
    )
}

export default App;
