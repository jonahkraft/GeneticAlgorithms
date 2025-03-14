import cookies from "../../cookies.ts";
import { useNavigate } from "react-router-dom";
import generateResultList from "./generate_result_list.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useEffect, useState } from "react";
import {placeholderButtonFunction} from "./ButtonFunctions.ts";
import graph from "./graph.tsx";
import graphGen from "./graphGen.tsx";
import styles from './DataVisualization.module.css';
import Card from "../../components/Card/Card.tsx";
import transmitParameters from "./parameters.tsx";
// import {type} from "node:os";
import DownloadButton from "../../components/DownloadButton/DownloadButton.tsx"
import UploadButton from "../../components/UploadButton/UploadButton.tsx";
import {downloadCSV} from "./ButtonFunctions.ts";
import GenericButton from '../../components/GenericButton/GenericButton.tsx';
import DropDown from "../../components/DropdownMenu/DropDown.tsx";
import CallBack from "../../components/DropdownMenu/CallBack.tsx";
import HistoricalData from "../../components/HistoricalData/HistoricalData.tsx"
import { Chart } from "chart.js";

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

function DataVisualization() {
    const navigate = useNavigate();
    const easySpeech = cookies.getCookies().easy_speech
    const role = cookies.getCookies().role
    
    const normalText = "In the genetic algorithm we start with a population of entities. This population is the first generation. Every generation is the base of the following generation. This is archived by selecting and multiplying good entities and deleting bad ones. Each entity represents a set of input values and their corresponding results for consumption and elasticity. First the input values will be randomly set. After all results are computed, the entities will be ranked depending on their result values. Good performing entities with slightly modified values are used to generate a new population. The best performing entities are called elites. Elites are not modified, but copied to the next generation. The worst performing entities will not be used for future generations.";
    const easyText = "In the genetic algorithm, we start with a group of entities. This group is the first generation. Every generation is the base for the next one. Good entities are chosen and multiplied, while bad ones are removed. Each entity represents a set of values and their results for fuel usage and elasticity. The values are first set randomly. After computing the results, the entities are ranked based on their performance. Good performing entities are slightly changed and used to create a new group. The best performing entities are called elites. Elites are not changed but copied to the next group. The worst entities are not used in future generations.";

    useEffect(() => {
        if (!cookies.isLoggedIn()) {
            console.log("redirect")
            navigate("/login");
        }
    }, [navigate]);

    const [showHistoricalData, setShowHistoricalData] = useState(false)

    function toggleHistoricalData() {
        setShowHistoricalData(!showHistoricalData)
    }

    const [waiting, setWaiting] = useState<boolean>(false)

    const [varGraph, setVarGraph] = useState<Chart<"line" | "scatter", { x: string; y: string; }[], unknown> | null>(null)
    const [varGraphGen, setVarGraphGen] = useState<Chart<"scatter", { x: number; y: number; }[], unknown> | null>(null);

    // id von dem Experiment, das gerade angezeigt wird
    const [id, setId] = useState("0")

    // data speichert Datensatz vom backend Server, funktioniert aktell noch nicht, daher ist data Null
    const [data, setData] = useState<HistoricalDataType[]>();

    // generations erstellt eine Liste aller Generations von 0 - x (in Test Liste 0-10)
    const [generations, setGenerations] = useState<string[]>([]);

    // selectedGeneration speichert die ausgewählte Generation und zeigt diese auf der Website an
    const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);

    // ändert den Main Content der Seite
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [generatedElement, setGeneratedElement] = useState<JSX.Element | null>(null);

    // Parameter from Requirement
    const [paraInputs, setParaInputs] = useState({
        aep: "",                    // Wert zwischen 0 und 1, float
        generation_count: "",       // int
        population_size: "",        // int
        given_seed: "",             // feste Vorgabe/random -> float
        elite_count: "",            // int
        alien_count: "",            // int
        weights: ""                 // list[float]
    });

    // Display the transmitted Parameters
    const [transmittedData, setTransmittedData] = useState("Transmitted Data: None");

    // Anzeige Graph aller Generationen
    useEffect(() => {
        console.log("hook: create graph with: ", data)
        if( data != null && data!.length > 0 ) {
            deconstructGraphs()
            setVarGraph(graph(data!))
            console.log("graph created")
        }
    }, [data]);

    // Anzeige Graph aller Generationen
    useEffect(() => {
        console.log(data)
        console.log(selectedGeneration)
        console.log(Boolean(data))
        console.log(Boolean(selectedGeneration))
        if( data && selectedGeneration) {
            const filtereddata = data.filter(entity => entity.generation === selectedGeneration);
            console.log(filtereddata)
            setVarGraphGen(graphGen(filtereddata));
        }
    }, [data, generatedElement]);

    function deconstructGraphs() {
        console.log("trying to destroy", varGraph, varGraphGen)

        if (varGraph != null) {
            console.log("destroy graph")
            varGraph.destroy()
        }
        if (varGraphGen != null) {
            console.log("destroy graphGen")
            varGraphGen.destroy()
            setSelectedGeneration(null)
        }
        
        /*
        const canvas = document.getElementById("my_graph") as HTMLCanvasElement
        (canvas.getContext("2d") as CanvasRenderingContext2D)
        */
    }

    // Change Drop Down Element
    function handleDropdownSelect(index: number) {
        console.log("handleDD")
        // Saves selected generation in state
        setSelectedGeneration(generations[index]);

        // Add Stuff like Update-UI
        setGeneratedElement(
            <div key={index} className="generation-canvas">
                <div style={{ width: "800px" }}><canvas id="my_graph_gen"></canvas></div>
            </div>
        );

        if( data && data.length > 0 && selectedGeneration) {
            graphGen(data.filter(entity => entity.generation === selectedGeneration));
        }
    }

    // Überprüfe, ob gegebener Input eine gültige Dezimalzahl ist (zB 1234.5678). Die Funktion erlaubt auch nur ein Komma (.)
    function handleParaChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        // Begrenzung der Eingabe auf 20 Zeichen
        if (value.length > 20) return;

        if(name === "generation_count"){
            // Erlaubt nur int-Zahlen
            if (/^\d+$|^$/.test(value)) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }

        if (["population_size", "elite_count", "alien_count"].includes(name)) {
            // Erlaubt nur int-Zahlen
            if (/^\d+$|^$/.test(value)) {
                setParaInputs((prev) => {
                    const updatedValues = { ...prev, [name]: value };

                    // Validierung: Alien + Elite dürfen Population nicht übersteigen
                    const populationSize = parseInt(updatedValues.population_size || "0", 10);
                    const eliteCount = parseInt(updatedValues.elite_count || "0", 10);
                    const alienCount = parseInt(updatedValues.alien_count || "0", 10);

                    if (eliteCount + alienCount >= populationSize) {
                        return prev; // Verhindert ungültige Werte
                    }

                    return updatedValues;
                });
            }
        }

        if (name === 'given_seed') {
            // Erlaubt nur float-Zahlen
            if (/^\d*$/.test(value)) {
                const num = parseInt(value, 10);
                if (value === "" || (num >= 1 && num <= 1000)) {
                    setParaInputs((prev) => ({ ...prev, [name]: value }));
                }
            }
        }

        if (name === 'aep') {
            // Erlaubt nur 0-1 Zahlen
            if (/^0(\.\d*)?$|^1$|^$/.test(value)) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }
        // TODO: 4 weights müssen übergeben werden zwischen alles (sinnvoll wäre negative Werte)
        if (name === "weights") {
            // Entferne unnötige Leerzeichen und trenne an ","
            const values = value.split(",").map((v) => v.trim());

            // Prüfe, ob jede Zahl ein Float
            const isValid = values.every(
                (num) => num === "" || num === "-" || !isNaN(Number(num)) || /^-?\d+(\.\d+)?$/.test(num)
            );
            // Falls gültig, setze den State
            if (isValid) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }
    }

    function updateData(data: HistoricalDataType[]) {
        //setGenerations(Array.from(new Set(data.map((entry) => (entry.generation)))))
        setWaiting(false)
        setGenerations(Array.from(new Set(data.map((entry) => (entry.generation)))))   
        setData(data)
        setId(data[0].experiment_id)
    }

    // Zeigt übermittelte Daten auf Seite an
     function handleTransmit(aep: string, generation_count: string, population_size: string, given_seed: string, elite_count: string, alien_count: string, weights: string, call: ((data: HistoricalDataType[]) => void)) {
        const result =  transmitParameters(aep, generation_count, population_size, given_seed, elite_count, alien_count, weights, call)
        //const result = `AEP: ${aep}, Generation Count: ${generation_count}, Population Size: ${population_size}, Given Seed: ${given_seed}, Elite Count: ${elite_count}, Alien Count: ${alien_count}, Weights: ${weigths}`;
        console.log("Rückgabe parameter")
        console.log(result)
       
        /*Papa.parse(result,{
            ...commonConfig,
            complete: (json: any) => {
              setTransmittedData(json.data);
            }
          });*/
    }

    function getGenertations(data: Record<string, HistoricalDataType[]>){
        if (Object.keys(data).length === 0){
            return
        }

        const Generations: string[] = []

        for (let i = 0; i <= data[0].length; i++){
            Generations.push(String(i))
        }
        console.log('generations', Generations)
        setGenerations(Generations)
    }

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

    function uploadCSV(event: React.ChangeEvent<HTMLInputElement>){
        console.log("uploadCSV")

        // get selected file
        const file = event.target.files?.[0];  // Nutze optional chaining

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
            getGenertations(parsedList)

            console.log(parsedList)

            const values = Object.values(parsedList).flat() as HistoricalDataType[];
            console.log(values)

            //graph(parsedList);
            //Object.values(parsedList)[1]
            // for-loop > select gen > setData
            let filteredList: HistoricalDataType[] = [];
            
            for (let i = 0; i < Object.values(parsedList).length; i++) {
                filteredList = filteredList.concat(filteredList, Object.values(parsedList)[i] as HistoricalDataType[])
            }
            console.log("text", filteredList)
            setData(filteredList);
        };

        reader.readAsText(file); // Liest die Datei als Text
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
            </div>

            <div className={styles.mainContent} id={"data_description"}>
                <Card>
                    <h2>Description</h2>
                    <p>
                        {easySpeech ? easyText : normalText}
                    </p>
                
                    <h2>Simulation Parameter</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Mutationsrate</td>
                                <td><input className={styles.userFormSelect} type="text" name="aep" value={paraInputs.aep} onChange={handleParaChange} /></td>
                                <td>Rate of mutation. A higher value results in higher mutation (values between 0 and 1)</td>
                            </tr>
                            <tr>
                                <td>Generation Count</td>
                                <td><input className={styles.userFormSelect} type="text" name="generation_count" value={paraInputs.generation_count} onChange={handleParaChange} /></td>
                                <td>Number of computaded generations</td>
                            </tr>
                            <tr>
                                <td>Population Size</td>
                                <td><input className={styles.userFormSelect} type="text" name="population_size" value={paraInputs.population_size} onChange={handleParaChange} /></td>
                                <td>Size of a population (Population Size &gt; Elite Count + Alien Count) </td>
                            </tr>
                            <tr>
                                <td>Given Seed</td>
                                <td><input className={styles.userFormSelect} type="text" name="given_seed" value={paraInputs.given_seed} onChange={handleParaChange} /></td>
                                <td>Seed for random generation of the first population Number between 1-1000. If kept empty, it will generate a random one between 1-1000</td>
                            </tr>
                            <tr>
                                <td>Elite Count</td>
                                <td><input className={styles.userFormSelect} type="text" name="elite_count" value={paraInputs.elite_count} onChange={handleParaChange} /></td>
                                <td>Number of elites. Elites are the top entities that will remain unchanged for the next generation</td>
                            </tr>
                            <tr>
                                <td>Alien Count</td>
                                <td><input className={styles.userFormSelect} type="text" name="alien_count" value={paraInputs.alien_count} onChange={handleParaChange} /></td>
                                <td>Number of Entities that will be randomly generated in every generation</td>
                            </tr>
                            <tr>
                                <td>Weigths</td>
                                <td><input className={styles.userFormSelect} type="text" name="weights" value={paraInputs.weights} onChange={handleParaChange} /></td>
                                <td>Weights of the result-values: Has to be 4 Values (x,x,x,x an x can be y.y or -y.y)</td>
                            </tr>
                            <tr>
                                <td>All parameters have a cap at 20 chars</td>
                            </tr>
                        </tbody>
                    </table>

                        <GenericButton disabled={waiting} title='Start Simulation' onClick={() => {
                            setWaiting(!waiting)
                            handleTransmit(paraInputs.aep, paraInputs.generation_count, paraInputs.population_size, paraInputs.given_seed, paraInputs.elite_count, paraInputs.alien_count, paraInputs.weights, updateData)
                        }} idd={"data_StartSimu"}/>
                    <hr/>
                    <label id="transData">{transmittedData}</label>
                </Card>

                <DropDown text={generations} callBack={new CallBack((index:number) => handleDropdownSelect(index))}></DropDown>

                <hr />

                {selectedGeneration ? (
                    <Card>
                        <h2>Selected generation: {selectedGeneration}</h2>
                        {generatedElement}
                    </Card>

                ) : (

                    <></>
                )}

                <Card>
                    <h2>{'Overview of all generations'}</h2>
                    <div style={{ width: "800px" }}><canvas id="my_graph"></canvas></div>
                </Card>
                <hr/>

                {showHistoricalData ? (
                    <HistoricalData/>
                ) : (
                    <></>
                )}

                <Card>
                    <div className={styles.userButtons}>

                        {role === "administrator" ? (
                            <>
                                <GenericButton title="Protocol" onClick={placeholderButtonFunction} idd={"data_Protocol"}/>
                                <GenericButton title="Debug" onClick={placeholderButtonFunction} idd={"data_Debug"}/>
                                <GenericButton title="History" onClick={toggleHistoricalData} idd={"data_History"}/>
                            </>
                        ) : <></>}
                        {role === "data_analyst" ? (
                            <>
                                <GenericButton title="History" onClick={placeholderButtonFunction} idd={"data_History"}/>
                            </>
                        ) : <></>}

                        <UploadButton onChange={uploadCSV}></UploadButton>
                        <DownloadButton onClick={() => downloadCSV('Frontendtest', id)}></DownloadButton>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default DataVisualization;