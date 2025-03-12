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

function transmitParameters(aep: string, generation_count: string, population_size: string, given_seed: string, elite_count: string, alien_count: string, weights: string){
    console.log(aep)
    console.log(generation_count)
    console.log(population_size)
    console.log(given_seed)
    console.log(elite_count)
    console.log(alien_count)
    console.log(weights)

    //const strategy = '1'
    // TODO: given_seed fest oder random
    // given_seed = ''

    // TODO: Funktionalität implementieren, die die Daten ans Backend schickt, dort die Funktionen auswertet und zurück ans Frontend schickt

    return `AEP: ${aep}, Generation Count: ${generation_count}, Population Size: ${population_size}, Given Seed: ${given_seed}, Elite Count: ${elite_count}, Alien Count: ${alien_count}, Weights: ${weights}`;
}


export default transmitParameters;
