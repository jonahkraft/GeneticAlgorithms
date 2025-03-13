import axios from "axios";
import cookies from "./cookies.ts";

function getSimulationData(columns: string[], rowConstraints: string[]) {
    axios.post('/api/get_simulation_data',
        { columns, row_constraints: rowConstraints },
        { headers: { "Authorization": `Bearer ${cookies.getCookies().token}` } }
    )
        .then(response => {
            const csvContent = response.data.content;
            console.log("Simulation Data:", csvContent);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Simulationsdaten:", error);
        });
}

export default getSimulationData;