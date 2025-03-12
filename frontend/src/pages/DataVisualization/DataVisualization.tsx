import cookies from "../../cookies.ts";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import generateResultList from "./generate_result_list.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Papa from 'papaparse';
import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import graph from "./graph.tsx";
import graphGen from "./graphGen.tsx";
import styles from './DataVisualization.module.css';
import Card from "../../components/Card/Card.tsx";
import transmitParameters from "./parameters.tsx";
// import {type} from "node:os";
import DownloadButton from "../../components/DownloadButton/DownloadButton.tsx"
import UserPersmissions from '../../components/UserPermissions/UserPersmissions.tsx'
import UploadButton from "../../components/UploadButton/UploadButton.tsx";
import {downloadCSV} from "./ButtonFunctions.ts";
import GenericButton from '../../components/GenericButton/GenericButton.tsx';

//

// function toggleSidebar(side: any) {
//     document.getElementById(side + 'Sidebar')?.classList.toggle('open')
// }

// Interface für Datentyp in functions loadGenerations
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


function DataVisualization() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.isLoggedIn()) {
            navigate("/login");
        }
    }, [navigate]);

    // data speichert Datensatz vom backend Server, funktioniert aktell noch nicht, daher ist data Null
    const [data, setData] = useState<object[]>([]);

    // generations erstellt eine Liste aller Generations von 0 - x (in Test Liste 0-10)
    const [generations, setGenerations] = useState<string[]>([]);

    // selectedGeneration speichert die ausgewählte Generation und zeigt diese auf der Website an
    const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);

    // ändert den Main Content der Seite
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [generatedElement, setGeneratedElement] = useState<JSX.Element | null>(null);

    /*
    // Parameter //TODO: Stuff for later
    const [inputs, setInputs] = useState({
        finalDrive: "",
        rollRadius: "",
        gear3: "",
        gear4: "",
        gear5: ""
    });
     */

    // Parameter from Requirement
    const [paraInputs, setParaInputs] = useState({
        aep: "",                    // Wert zwischen 0 und 1
        generation_count: "",       // int
        population_size: "",        // int
        given_seed: "",             // feste Vorgabe/random -> float
        elite_count: "",            // int
        alien_count: "",            // int
        weights: ""                 // float
    });

    // Display the transmitted Parameters
    const [transmittedData, setTransmittedData] = useState("Transmitted Data: Placeholder");


    // load CSV Files
    useEffect(() => {
        console.log('DataVisualization');
        // call backend-API
        axios.get("/api/get_simulation_data")
            .then((response) => {
                console.log('DataVisualization');
                const result = Papa.parse(response.data, { header: true, skipEmptyLines: true });
                setData(result.data);
                console.log(result);
            })
            .catch((error) => console.error("Fehler beim Laden der CSV:", error));
    }, []);

    // Verarbeitung der Daten (generateResultList & loadGenerations)
    useEffect(() => {
        if (data.length > 0) {
            const generations = generateResultList(data);
            loadGenerations(generations);
        } else {
            // do it anyway for testing
            // TODO: else Fall abändern, wenn backend Abfrage funktioniert
            const generations = generateResultList(data);
            loadGenerations(generations);
        }
    }, [data]);

    // Anzeige Graph aller Generationen
    useEffect(() => {
        graph();
    }, []);

    // Anzeige Graph einer spezifischen Generation (alle Generationen x)
    useEffect(() => {
        graphGen(selectedGeneration!);
    }, [selectedGeneration]);

    // Show Generation Drop Down
    function loadGenerations(arr: Record<string, GenerationData[]>) {
        console.log("in function loadGen:", typeof (arr)) // returned object
        if (Object.keys(arr).length === 0) {
            return
        }

        const newGenerations: string[] = [];
        //console.log(arr);

        for (let i = 0; i <= arr[0].length; i++) {
            //console.log(arr[i]);
            //newGenerations.push(`Generation ${i}`);
            newGenerations.push(String(i));
        }
        setGenerations(newGenerations);
    }

    // Change Drop Down Element
    function handleDropdownSelect(index: number) {
        const selectedGen = 'Generation ' + generations[index];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.getElementById("dropdown-basic").innerHTML = selectedGen;

        // Saves selected generation in state
        setSelectedGeneration(generations[index]);
        //console.log("Ausgewählte Generation:", selectedGen);

        // Add Stuff like Update-UI
        setGeneratedElement(
            <div key={index} className="generation-canvas">
                <div style={{ width: "800px" }}><canvas id="my_graph_gen"></canvas></div>
            </div>
        );
    }

    // Überprüfe, ob gegebener Input eine gültige Dezimalzahl ist (zB 1234.5678). Die Funktion erlaubt auch nur ein Komma (.)
    function handleParaChange(e: React.ChangeEvent<HTMLInputElement>) {
        // TODO: Eingabefeld begrenzen, damit man nicht zu lange zahlen eintragen kann
        const { name, value } = e.target;
        if (e.target.name === 'generation_count' || e.target.name === 'population_size' || e.target.name === 'elite_count' || e.target.name === 'alien_count') {
            // Erlaubt nur int-Zahlen
            if (/^\d+$|^$/.test(value)) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }
        if (e.target.name === 'given_seed' || e.target.name === 'weights') {
            // Erlaubt nur float-Zahlen
            if (/^\d*\.?\d*$/.test(value)) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }
        if (e.target.name === 'aep') {
            // Erlaubt nur 0-1 Zahlen
            if (/^0(\.\d*)?$|^1$|^$/.test(value)) {
                setParaInputs((prev) => ({ ...prev, [name]: value }));
            }
        }
    }

    // Zeigt übermittelte Daten auf Seite an
    function handleTransmit(aep: string, generation_count: string, population_size: string, given_seed: string, elite_count: string, alien_count: string, weigths: string) {
        const result = `AEP: ${aep}, Generation Count: ${generation_count}, Population Size: ${population_size}, Given Seed: ${given_seed}, Elite Count: ${elite_count}, Alien Count: ${alien_count}, Weights: ${weigths}`;
        setTransmittedData(result);
    }

    // For Debugging Purpose/ Test Purpose
    console.log('Data: ', data, typeof (data))
    console.log('Generations: ', generations, typeof (generations))
    console.log('SelectedGeneration: ', selectedGeneration, typeof (selectedGeneration))
    console.log('GeneratedElement: ', generatedElement, typeof (generatedElement))
    console.log(document.cookie)
    const tmpList = generateResultList(data)

    return (
        <div className={styles.wrapper}>
            {/*<div className={styles.toolbar}>Toolbar</div><*/}

            <div className={styles.container}>
                {/*<button className="toggle-btn left-btn" onClick={() => toggleSidebar('left')}>☰</button>*/}
                {/*<div className="sidebar left" id="leftSidebar">*/}
                {/*    <button className="close-btn" onClick={() => toggleSidebar('left')}>✖</button>*/}
                {/*    Left Sidebar Content*/}
                {/*</div>*/}
            </div>

            <div className={styles.mainContent}>
                {/*<Card>
                    <div className={styles.paraContent}>
                        <a>Final Drive</a>
                        <input type="text" name="finalDrive" value={inputs.finalDrive} onChange={handleParaChange} />
                        <a>Roll Radius</a>
                        <input type="text" name="rollRadius" value={inputs.rollRadius} onChange={handleParaChange} />
                        <a>Gear 3</a>
                        <input type="text" name="gear3" value={inputs.gear3} onChange={handleParaChange} />
                        <a>Gear 4</a>
                        <input type="text" name="gear4" value={inputs.gear4} onChange={handleParaChange} />
                        <a>Gear 5</a>
                        <input type="text" name="gear5" value={inputs.gear5} onChange={handleParaChange} />
                        <button className={styles.paraButton} onClick={() => transmitParameters(inputs.finalDrive, inputs.rollRadius, inputs.gear3, inputs.gear4, inputs.gear5)}>Apply Changes</button>
                    </div>
                </Card>*/}

                <Card>
                    <h2>Description</h2>
                    <p>
                        In the genetic algorithm we start with a population of entities.
                        This population is the first generation.
                        Every generation is the base of the following generation.
                        This is archived by selecting and multiplying good entities and deleting bad ones.
                        Each entity represents a set of input values and their corresponding results for consumption and elasticity.
                        First the input values will be randomly set.
                        After all results are computed, the entities will be ranked depending on their result values.
                        Good performing entities with slightly modified values are used to generate a new population.
                        The best performing entities are called elites.
                        Elites are not modified, but copied to the next generation.
                        The worst performing entities will not be used for future generations.
                    </p>
                </Card>

                <Card>
                    <div className={styles.paraContent}>
                        <div>
                            <label>Mutationsrate: </label>
                            <input type="text" name="aep" value={paraInputs.aep} onChange={handleParaChange} />
                            <label>rate of mutation. A higher value results in less mutation (values between 0 and 1)</label>
                        </div>
                        <div>
                            <label>Generation Count: </label>
                            <input type="text" name="generation_count" value={paraInputs.generation_count} onChange={handleParaChange} />
                            <label>Number of computaded generations</label>
                        </div>
                        <div>
                            <label>Population Size: </label>
                            <input type="text" name="population_size" value={paraInputs.population_size} onChange={handleParaChange} />
                            <label>Size of a population</label>
                        </div>
                        <div>
                            <label>Given Seed: </label>
                            <input type="text" name="given_seed" value={paraInputs.given_seed} onChange={handleParaChange} />
                            <label>Seed for random generation of the first population</label>
                        </div>
                        <div>
                            <label>Elite Count: </label>
                            <input type="text" name="elite_count" value={paraInputs.elite_count} onChange={handleParaChange} />
                            <label>Number of elites. Elites are the top entities that will remain unchanged for the next generation</label>
                        </div>
                        <div>
                            <label>Alien Count: </label>
                            <input type="text" name="alien_count" value={paraInputs.alien_count} onChange={handleParaChange} />
                            <label>Number of Entities that will be randomly generated in every generation</label>
                        </div>
                        <div>
                            <label>Weigths: </label>
                            <input type="text" name="weights" value={paraInputs.weights} onChange={handleParaChange} />
                            <label>Weights of the result-values: consumption, elasticity (values between 3-5)</label>
                        </div>

                        <GenericButton title='Start Simulation' onClick={() => {
                            transmitParameters(paraInputs.aep, paraInputs.generation_count, paraInputs.population_size, paraInputs.given_seed, paraInputs.elite_count, paraInputs.alien_count, paraInputs.weights);
                            handleTransmit(paraInputs.aep, paraInputs.generation_count, paraInputs.population_size, paraInputs.given_seed, paraInputs.elite_count, paraInputs.alien_count, paraInputs.weights)
                        }} />
                    </div>
                    <hr/>
                    <a id="transData">{transmittedData}</a>
                </Card>

                <hr/>

                <Dropdown id={styles.dropdownWrapper}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Generation
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-basic">
                        {generations.length > 0 ? (
                            generations.map((gen, index) => (
                                <Dropdown.Item key={index} onClick={() => handleDropdownSelect(index)}>
                                    {'Generation ' + gen}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>Load generations...</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
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
                <Card>
                    <div className={styles.userButtons}>
                        <UserPersmissions></UserPersmissions>
                        <UploadButton></UploadButton>
                        <DownloadButton onClick={() => downloadCSV(tmpList, 'Frontendtest')}></DownloadButton>
                    </div>
                </Card>

                {/*<h2>{selectedGeneration ? `Selected generation: ${selectedGeneration}` : "Please select a generation"}</h2>*/}
                {/*{generatedElement}*/}
            </div>

            {/*<div className="sidebar right" id="rightSidebar">Right Sidebar Content</div>*/}
            {/*<button className="toggle-btn right-btn" onClick={() => toggleSidebar('right')}>☰</button>*/}
        </div>
    );
}

export default DataVisualization;