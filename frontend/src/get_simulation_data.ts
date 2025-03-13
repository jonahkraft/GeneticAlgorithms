import axios from "axios";
import cookies from "./cookies.ts";

interface HistoricalData {
    generation: string;
    'Final Drive': string;
    'Roll Radius': string;
    'Gear 3': string;
    'Gear 4': string;
    'Gear 5': string;
    Consumption: string;
    'Elasticity 3': string;
    'Elasticity 4': string;
    'Elasticity 5': string;
    'experiment_id': string;
}

function parseCSV(csv: string): Record<string, HistoricalData[]> {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const data: Record<string, HistoricalData[]> = {};

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const experimentId = values[headers.indexOf("experiment_id")];

        const entry: HistoricalData = {
            generation: values[headers.indexOf("generation")],
            "Final Drive": values[headers.indexOf("final_drive")],
            "Roll Radius": values[headers.indexOf("roll_radius")],
            "Gear 3": values[headers.indexOf("gear_3")],
            "Gear 4": values[headers.indexOf("gear_4")],
            "Gear 5": values[headers.indexOf("gear_5")],
            Consumption: values[headers.indexOf("consumption")],
            "Elasticity 3": values[headers.indexOf("elasticity_3")],
            "Elasticity 4": values[headers.indexOf("elasticity_4")],
            "Elasticity 5": values[headers.indexOf("elasticity_5")],
            "experiment_id": values[headers.indexOf("experiment_id")]
        };

        if (!data[experimentId]) {
            data[experimentId] = [];
        }
        data[experimentId].push(entry);
    }

    // Sortiere jede Experimentengruppe nach Generation als Zahl (numerisch)
    for (const experimentId in data) {
        data[experimentId].sort((a, b) => {
            // Parsing der Generation als Zahl für die Sortierung
            return parseInt(a.generation, 10) - parseInt(b.generation, 10);
        });
    }

    return data;
}

async function getSimulationData(columns: string[], rowConstraints: string[]): Promise<Record<string, HistoricalData[]>> {
    try {
        const response = await axios.post('/api/get_simulation_data',
            {columns, row_constraints: rowConstraints},
            {headers: {"Authorization": `Bearer ${cookies.getCookies().token}`}}
        );
        const csvContent = response.data.content;
        return parseCSV(csvContent);
    } catch (error) {
        console.error("Fehler beim Abrufen der Simulationsdaten:", error);
        throw error;
    }
}

export default getSimulationData;