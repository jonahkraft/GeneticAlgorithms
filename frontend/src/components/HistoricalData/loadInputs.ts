import axios from "axios";

interface ExperimentInputs {
    population_size: number;
    simulation_seed: number;
    generation_count: number;
    strategy: number;
    aep: number;
    elite_count: number;
    alien_count: number;
    weights: number[];
}

async function getExperimentInputs(
    experimentId: string,
    token: string
): Promise<ExperimentInputs | null> {
    try {
        const response = await axios.post<ExperimentInputs>(
            "/api/get_experiment_inputs",
            { experiment_id: experimentId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching experiment inputs:", error);
        return null;
    }
}

export default getExperimentInputs;
