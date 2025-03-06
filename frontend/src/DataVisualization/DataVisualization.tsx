import Header from "../Header/Header.tsx"
import Footer from "../Footer/Footer.tsx"
import ReactDOM from 'react-dom/client'
import axios from 'axios';
// @ts-ignore
import Papa from 'papaparse';
import {useEffect, useState} from "react";


function generateResultList(arr: any){
    // Create Object that contains lists for every generation
    const groupedData: Record<string, any[]> = {};

    arr.data.forEach((entry: { generation: any; }) => {
        // get Generation
        const generation = entry.generation;

        // if groupData doesent contain a list for a generation, add it
        if (!groupedData[generation]) {
            groupedData[generation] = [];
        }

        // Add specific entry to specific generation list
        groupedData[generation].push(entry);
    });

    return groupedData;
}


// rework because waiting for backend stuff, Annahme zum testen, CSV ist vorhanden
const readCSV = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get("/api/csv") // Backend-API aufrufen
            .then((response) => {
                const result = Papa.parse(response.data, { header: true, skipEmptyLines: true });
                setData(result.data);
            })
            .catch((error) => console.error("Fehler beim Laden der CSV:", error));
    }, []);
    console.log(data);
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
