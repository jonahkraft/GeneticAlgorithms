import Header from "../Header/Header.tsx"
import Footer from "../Footer/Footer.tsx"
import ReactDOM from 'react-dom/client'
import React, {useEffect} from "react";
import graph from "./graph.tsx";

function toggleSidebar(side: any){
    document.getElementById(side + 'Sidebar')?.classList.toggle('open')
}

function printOutput(side: String) {
    const para = document.getElementById("output")
    para?.append("test")
}

function DataVisualization() {

    useEffect(() => {
        graph();
    }, []);

    return (
        <>
            <Header/>
            <div className="toolbar">Toolbar</div>
            <div className="container">
                <button className="toggle-btn left-btn" onClick={() => toggleSidebar('left')}>☰</button>
                <div className="sidebar left" id="leftSidebar">Left Sidebar Content</div>
                <div className="content">
                    <h2>Diagramm wird hier angezeigt</h2>
                </div>
                <div className="sidebar right" id="rightSidebar">Right Sidebar Content</div>
                <button type="button" className="toggle-btn right-btn" onClick={() => printOutput("-test")}>☰</button>
                
                <p id="output">Oh nein, wenn dass die Mama sieht.</p>

                <div style={{width:"800px"}}><canvas id="my_graph"></canvas></div>

            </div>
            <Footer/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root_data_visualization')!).render(
    <DataVisualization></DataVisualization>);
