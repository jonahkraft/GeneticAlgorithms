import Chart from 'chart.js/auto'

export interface HistoricalDataType {
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

function graph(data: HistoricalDataType[]) {
    if (!data || Object.keys(data).length === 0) return;

    // Liste für Scatter-Plot (Einzelne Werte)
    const list: { gen: string; consumption: string }[] = [];

    // Objekt zur Berechnung der Durchschnittswerte
    const avgMap: Record<string, { sum: number; count: number }> = {};  
    //const avgMap: {gen: string, sum: number, count: number }[] = [];

    // Über alle Generationen iterieren
    data.forEach(entry => {

        // Scatter-Daten speichern
        list.push({ gen: entry.generation, consumption: entry.Consumption})

        // Durchschnittswerte berechnen
        if (!avgMap[entry.generation]) {
            avgMap[entry.generation] = { sum: 0, count: 0 };
        }
        avgMap[entry.generation].sum += Number(entry.Consumption);
        avgMap[entry.generation].count += 1;
    })

    // Durchschnittsdaten erstellen
    const avg = Object.keys(avgMap).map(gen => ({
        gen,
        genAvg: avgMap[gen].sum / avgMap[gen].count,
    }));

    // Canvas-Element abrufen
    const ctx = document.getElementById("my_graph") as HTMLCanvasElement;
    if (!ctx) return;

    // Erstelle den Graphen mit Chart.js
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Consumption",
                    type: "scatter",
                    data: list.map(row => ({ x: row.gen, y: row.consumption })),
                    borderColor: "rgb(0, 35, 224)",
                    backgroundColor: "rgba(0, 35, 224, 0.5)",
                },
                {
                    type: "line",
                    label: "Average Consumption",
                    data: avg.map(row => ({ x: row.gen, y: String(row.genAvg) })),
                    borderColor: "rgb(0, 0, 0)",
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: "rgb(0, 0, 0)",
                },
            ],
        },
        options: {
            scales: {
                x: { title: { display: true, text: "Generation" } },
                y: { title: { display: true, text: "Consumption" } },
            },
        },
    });
}

export default graph;
