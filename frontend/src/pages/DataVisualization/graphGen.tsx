import Chart from "chart.js/auto";

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

const graphGen = (data: HistoricalDataType[]) => {

    // Liste zur Speicherung der Werte für die Scatter-Plots
    const list = data.map(entry => ({
        gear3: Number(entry["Gear 3"]),
        ela3: Number(entry["Elasticity 3"]),
        gear4: Number(entry["Gear 4"]),
        ela4: Number(entry["Elasticity 4"]),
        gear5: Number(entry["Gear 5"]),
        ela5: Number(entry["Elasticity 5"]),
    }));

    // Canvas-Element abrufen
    const ctx = document.getElementById("my_graph_gen") as HTMLCanvasElement;
    if (!ctx) return;

    // Neues Chart.js Diagramm erstellen
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Gear 3 / Elasticity 3",
                    data: list.map(row => ({ x: row.gear3, y: row.ela3 })),
                    borderColor: "rgb(0, 35, 224)",
                    backgroundColor: "rgba(0, 35, 224, 0.5)",
                },
                {
                    label: "Gear 4 / Elasticity 4",
                    data: list.map(row => ({ x: row.gear4, y: row.ela4 })),
                    borderColor: "rgb(184, 76, 254)",
                    backgroundColor: "rgba(184, 76, 254, 0.5)",
                },
                {
                    label: "Gear 5 / Elasticity 5",
                    data: list.map(row => ({ x: row.gear5, y: row.ela5 })),
                    borderColor: "rgb(22, 241, 253)",
                    backgroundColor: "rgba(22, 241, 253, 0.5)",
                },
            ],
        },
        options: {
            scales: {
                x: { title: { display: true, text: "Gear" } },
                y: { title: { display: true, text: "Elasticity" } },
            },
        },
    });
};

export default graphGen;
