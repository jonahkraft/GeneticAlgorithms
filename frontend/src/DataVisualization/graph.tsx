import Chart from 'chart.js/auto'

const graph = () => {
    const dat1 = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    const ctx = document.getElementById("my_graph") as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(
        // @ts-ignore
        ctx,
        {
            type: 'scatter',
            data: {
                labels: dat1.map(row => row.year),
                datasets: [
                    {
                        label: 'Verbrauch',
                        data: dat1.map(row => row.count)
                    }
                ]
            }
        }
    );
};

export default graph;