import { saveAs } from 'file-saver';
import getSimulationData from "../../get_simulation_data.ts";

export function placeholderButtonFunction(){
    alert('Diese Funktionalität wird fertig implementiert, sobald das Einbinden mit dem Backend funktioniert')
}

function showProtocol(){
    // TODO: Backend API
    return
}

function showDebug(){
    // TODO: ?
    return
}
/*
function parseCSVToList(csvContent: string) {
    const result: any = {};

    // Remove unnecessary spaces
    const lines = csvContent.trim().split("\n");

    if (lines.length < 2) {
        console.error("CSV file is empty or has no data rows!");
        return result;
    }

    // Extract column headers
    const keys = lines[0].split(";");

    // Process each data row
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(";");
        if (values.length !== keys.length) continue; // Ignore malformed rows

        // Create row object
        const row: any = {};
        keys.forEach((key, index) => {
            row[key] = values[index];
        });

        // Determine the generation from the "generation" column
        const generation = row["generation"];
        if (!result[generation]) {
            result[generation] = [];
        }

        result[generation].push(row);
    }

    return result;
}

export function uploadCSV(event: any){
    // get selected file
    const file = event.target.files[0]

    // check file
    if (!file) {
        alert('Please choose a CSV-File');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        // content of uploaded file
        // @ts-ignore
        const csvContent = e.target.result;
        // list which will contain the parsedCSV file
        // @ts-ignore
        const parsedList = parseCSVToList(csvContent);
        // TODO: Usage for pasedList (backend i.e)
        console.log(parsedList)
        getGenertations(parsedList)
        graph(parsedList);
    };

    reader.readAsText(file); // Liest die Datei als Text
}

 */

export async function downloadCSV(filename: string, id: string){

    let csvContent = "";
    let blocker = 0;
    const data = await getSimulationData(["generation", "final_drive", "roll_radius", "gear_3", "gear_4", "gear_5", "consumption", "elasticity_3", "elasticity_4", "elasticity_5", "experiment_id"], [`experiment_id = ${id}`]);

    // Iterate through all generations
    Object.keys(data).forEach((generationKey) => {

        // Collect data from current generation
        const generationData = data[generationKey];

        if (generationData.length > 0) {
            // Collect Column names, excluding "experiment_id"
            const keys = Object.keys(generationData[0]) //.filter(key => key !== "experiment_id");

            if (blocker === 0) {
                // add to csvContent accordingly
                csvContent += keys.join(";") + "\n";
                blocker += 1;
            }

            // Iterate through every row
            generationData.forEach((row: any) => {
                // Collect row data, excluding "experiment_id"
                const values = keys.map((key) => row[key]);
                // add to csvContent accordingly
                csvContent += values.join(";") + "\n";
            });
        }
    });

    // Save and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
}



//export default { placeholderButtonFunction, showProtocol, showDebug, uploadCSV, downloadCSV}