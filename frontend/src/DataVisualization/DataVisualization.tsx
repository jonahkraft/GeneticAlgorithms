import Header from "../Header/Header.tsx"
import Footer from "../Footer/Footer.tsx"
import ReactDOM from 'react-dom/client'
import * as fs from 'fs';
// @ts-ignore
import Papa from 'papaparse';


function readCSV(){
    const filePath = 'generations.csv';
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const result = Papa.parse(fileContent, {
        header: true, // Falls die erste Zeile Spaltennamen enthält
        skipEmptyLines: true
    });
    console.log(result);
}


function toggleSidebar(side: any){
    document.getElementById(side + 'Sidebar')?.classList.toggle('open')
}


function DataVisualization() {
    readCSV()
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
                <button className="toggle-btn right-btn" onClick={() => toggleSidebar('right')}>☰</button>
            </div>
            <Footer/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root_data_visualization')!).render(
    <DataVisualization></DataVisualization>);
