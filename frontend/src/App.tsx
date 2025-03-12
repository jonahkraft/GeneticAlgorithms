import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import DataVisualization from "./pages/DataVisualization/DataVisualization.tsx";
import Login from "./pages/Login/Login.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
    return(
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/data_visualization" element={<DataVisualization/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/settings" element={<Settings/>}></Route>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
