/* // TODO: Optional Function
function transmitParameters(finaldrive: string, rollradius: string, gear3: string, gear4: string, gear5: string){
    console.log(finaldrive)
    console.log(rollradius)
    console.log(gear3)
    console.log(gear4)
    console.log(gear5)

    const strategy = '1'
    // given_seed fest oder random

    // return
}
*/

import cookies from "../../cookies.ts";
import axios from "axios";
import getSimulationData from "../../get_simulation_data.ts";

function transmitParameters(aep: string, generation_count: string, population_size: string, given_seed: string, elite_count: string, alien_count: string, weights: string){
    console.log(aep, typeof(aep))
    console.log(generation_count, typeof(generation_count))
    console.log(population_size, typeof(population_size))
    console.log(given_seed, typeof(given_seed))
    console.log(elite_count, typeof(elite_count))
    console.log(alien_count, typeof(alien_count))
    console.log(weights, typeof(weights))

    const weightsArray = weights.split(",");
    console.log(weightsArray)

    // TODO: startegy kanan 1,2 oder 3 sein

    //const strategy = '2' laut backend
    // TODO: given_seed fest oder random
    // given_seed = ''
    const token = cookies.getCookies().token
    // call backend-API
    axios.post("/api/start_simulation", { "population_size": population_size, "simulation_seed": given_seed, "generation_count": generation_count ,"strategy": '2', "aep": aep, "elite_count": elite_count, "alien_count": alien_count, "weights": weightsArray },
        { headers: { "Authorization": `Bearer ${token.trim()}`, "Content-Type": "application/json" } })
        .then((response) => {
            console.log(response.data.experiment_id)
            getSimulationData([], [response.data.experiment_id])
        })
        .catch(error => {
            if (error.response) {
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
                console.error("Error Headers:", error.response.headers);
            } else {
                console.error("Request failed:", error.message);
            }
        });


    return `AEP: ${aep}, Generation Count: ${generation_count}, Population Size: ${population_size}, Given Seed: ${given_seed}, Elite Count: ${elite_count}, Alien Count: ${alien_count}, Weights: ${weights}`;
}

export default transmitParameters;
