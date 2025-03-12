import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import cookies from "../../cookies.ts";
import GenericButton from '../../components/GenericButton/GenericButton.tsx';

function Home() {
    const navigate = useNavigate()

    function clickButton() {
        if (!cookies.isLoggedIn()) {
            navigate("/login")
        } else {
            navigate("/data_visualization")
        }
    }

    return (
        <div className={styles.wrapper}>
            <br/><br/>
            <div className={styles.mainContent}>
                <h2 className={styles.header}>Welcome to the Simulation</h2>
                <p className={styles.introText}>
                    Evolution: The driving force for diversity and adaptation on our planet. Natural selection ensures that only the strongest survive and pass on the secret of their success to their children.
                </p>
                <div className={styles.pictureContainer}>
                    <img src="/example.png" className={styles.image} alt="Example Data Visaulization"/>

                </div>
                <p className={styles.introText}>
                    Our simulation uses these same principles in the form of genetic algorithms to find the optimal balance between performance and consumption in vehicles.                     For each configuration of parameters, the program returns the Pareto front, a collection of solutions where no value can be improved without worsening another.

                </p>
                <GenericButton title="Proceed to Simulation" onClick={clickButton}></GenericButton>
            </div>

            <div className={styles.faq}>
                <h3 className={styles.smallHeader}>FAQ</h3>
                <details className={styles.details}>
                    <summary className={styles.summary}>What is the purpose of this simulation?</summary>
                    <p className={styles.detailsText}>This simulation is designed to optimize specific characteristics of a car using a genetic algorithm. A set of predefined parameters is provided to the algorithm, which then iterates through multiple generations, continuously improving until an optimal solution is found.</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary}>How do I use the simulation?</summary>
                    <p className={styles.detailsText}>To begin, navigate to the Data Visualization page. There, you can define the relevant parameters and start the simulation. If you wish to analyze a specific generation in more detail, you can select it from the drop-down menu.</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary}>What do the graphs represent?</summary>
                    <p className={styles.detailsText}>The overview graph displays all members of the population, organized by generation and consumption. The generation-specific graph provides a more detailed view, where each member of a generation is represented by three points—one for each of the three gears. These points are positioned based on their gear and elasticity.</p>
                </details>
            </div>
        </div>
    );
}

export default Home;
