import getSimulationData from "../../get_simulation_data.ts";
import { useEffect, useState } from "react";

interface HistoricalDataType {
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

function HistoricalData() {
    const [resultData, setResultData] = useState<HistoricalDataType[]>([]);

    useEffect(() => {
        getSimulationData(["generation", "final_drive", "roll_radius", "gear_3", "gear_4", "gear_5", "consumption", "elasticity_3", "elasticity_4", "elasticity_5", "experiment_id"], [])
            .then(data => {
                const flattenedData = Object.values(data).flat();
                setResultData(flattenedData);
            })
            .catch(error => {
                console.error("Fehler beim Laden der Resultate:", error);
            });
    }, []);

    useEffect(() => {
        if (resultData.length > 0) {
            console.log("Geladene Simulationsdaten:", resultData);
        }
    }, [resultData]);

    return (
        <>
            <h2>Historical Data</h2>
            <table border={1}>
                <thead>
                <tr>
                    <th>Experiment id</th>
                    <th>Generation</th>
                    <th>Final Drive</th>
                    <th>Roll Radius</th>
                    <th>Gear 3</th>
                    <th>Gear 4</th>
                    <th>Gear 5</th>
                    <th>Consumption</th>
                    <th>Elasticity 3</th>
                    <th>Elasticity 4</th>
                    <th>Elasticity 5</th>
                </tr>
                </thead>
                <tbody>
                {resultData.map((row, index) => (
                    <tr key={index}>
                        <td>{row["experiment_id"]}</td>
                        <td>{row.generation}</td>
                        <td>{row["Final Drive"]}</td>
                        <td>{row["Roll Radius"]}</td>
                        <td>{row["Gear 3"]}</td>
                        <td>{row["Gear 4"]}</td>
                        <td>{row["Gear 5"]}</td>
                        <td>{row.Consumption}</td>
                        <td>{row["Elasticity 3"]}</td>
                        <td>{row["Elasticity 4"]}</td>
                        <td>{row["Elasticity 5"]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default HistoricalData;