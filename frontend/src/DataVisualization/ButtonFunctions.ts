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

function uploadCSV(){
    // TODO: Actually rein front end
    return
}

export function downloadCSV(data: any, filename: string){
    console.log(document)
    console.log(data)
    let csvContent = "data:text/csv;charset=utf-8,";

    // Go through all generations
    Object.keys(data).forEach((generationKey) => {
        csvContent += `Generation ${generationKey}\n`;

        const generationData = data[generationKey];

        if(generationData.length > 0){
            const keys = Object.keys(generationData[0])
            csvContent += keys.join(",") + "\n";

            generationData.forEach((row: any) => {
                const values = keys.map(key => row[key]);
                csvContent += values.join(",") + "\n";
            });

            csvContent += "\n";
        }
    });

    // Save and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
}



export default { placeholderButtonFunction, showHistory, showProtocol, showDebug, uploadCSV, downloadCSV}