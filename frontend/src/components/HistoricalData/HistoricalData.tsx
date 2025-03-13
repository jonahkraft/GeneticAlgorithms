import getSimulationData from "../../get_simulation_data.ts";
import {useEffect, useState} from "react";

interface GenerationData {
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
}

function HistoricalData() {
    const [resultData, setResultData] = useState<GenerationData[]>([]);

    function loadResultData() {
        getSimulationData(["generation", "final_drive", "roll_radius", "gear_3", "gear_4", "gear_5", "consumption", "elasticity_3", "elasticity_4", "elasticity_5", "experiment_id"], [])
            .then(data => {
                const flattenedData = Object.values(data).flat();
                setResultData(flattenedData);
            })
            .catch(error => {
                console.error("Fehler beim Laden der Resultate:", error);
            });
    }

    useEffect(() => {
        if (resultData.length > 0) {
            console.log("Geladene Simulationsdaten:", resultData);
        }
    }, [resultData]);


    return(
        <>
            <h2>Historical Data</h2>
        </>
    )
}

export default HistoricalData;