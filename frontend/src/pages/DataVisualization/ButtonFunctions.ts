import { saveAs } from 'file-saver';

export function placeholderButtonFunction(){
    alert('Diese Funktionalität wird fertig implementiert, sobald das Einbinden mit dem Backend funktioniert')
}

function showHistory(){
    // TODO: Backend API
    return
}

function showProtocol(){
    // TODO: Backend API
    return
}

function showDebug(){
    // TODO: IDK
    return
}

function parseCSVToList(csvContent: any) {
    const result = {}

    // remove unnecessary spaces
    const lines = csvContent.trim().split("\n");
    let currentGeneration: any = null;

    let keys: any = [];
    let currentData: any = [];

    lines.forEach((line: any) => {
        // Look for new row
        if (line.startsWith("Generation")) {
            // does current generation already exist
            if (currentGeneration !== null) {
                // @ts-ignore
                result[currentGeneration] = currentData;
            }

            currentGeneration = line.split(" ")[1];
            currentData = [];
        }
        else {
            // If it is no "generation"-row, start a new one
            const values = line.split(";");

            //
            if (keys.length === 0) {
                // get column names
                keys = values;
            }
            else {
                // if key is already set, just add the data
                const row = { generation: currentGeneration };
                values.forEach((value: any, index: number) => {
                    // @ts-ignore
                    row[keys[index]] = value;
                });
                currentData.push(row);
            }
        }
        // for last gen
        if (currentGeneration !== null) {
            // @ts-ignore
            result[currentGeneration] = currentData;
        }
    });
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
        const parsedList = parseCSVToList(csvContent);
        // TODO: Usage for pasedList (backend i.e)
        console.log(parsedList);
    };

    reader.readAsText(file); // Liest die Datei als Text
}

export function downloadCSV(data: any, filename: string){
    let csvContent = "";

    // Iterate through all generations
    Object.keys(data).forEach((generationKey) => {
        // Add Generation Row in csvContent
        csvContent += `Generation ${generationKey}\n`;

        // Collect data from current generation
        const generationData = data[generationKey];

        if (generationData.length > 0) {
            // Collect Column names
            const keys = Object.keys(generationData[0]);
            // add to csvContent accordingly
            csvContent += keys.join(";") + "\n";

            // Iterate through every row
            generationData.forEach((row: any) => {
                // Collect row data accordingly to specific column
                const values = keys.map((key) => row[key]);
                // add to csvContent accordingly
                csvContent += values.join(";") + "\n";
            });

            // add empty row for better reading
            csvContent += "\n";
        }
    });

    // Save and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
}



export default { placeholderButtonFunction, showHistory, showProtocol, showDebug, uploadCSV, downloadCSV}