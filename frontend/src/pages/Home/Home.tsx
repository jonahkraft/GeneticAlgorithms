import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import cookies from "../../cookies.ts";
import GenericButton from '../../components/GenericButton/GenericButton.tsx';

function Home() {
    const navigate = useNavigate()
    const easySpeech = cookies.getCookies().easy_speech

    const normalP1 = "Evolution: The driving force for diversity and adaptation on our planet. Natural selection ensures that only the strongest survive and pass on the secret of their success to their children.";
    const easyP1 = "Evolution: The force that helps living things change and survive. Only the strongest can survive and teach their children how to succeed.";

    const normalP2 = "Our simulation uses these same principles in the form of genetic algorithms to find the optimal balance between performance and consumption in vehicles. For each configuration of parameters, the program returns the Pareto front, a collection of solutions where no value can be improved without worsening another.";
    const easyP2 = "Our simulation uses genetic algorithms to find the best balance between performance and fuel usage in vehicles. For each set of parameters, the program shows the Pareto front, a set of solutions where no value can be improved without making another worse.";

    const normalFAQ = {
        purpose: "This simulation is designed to optimize specific characteristics of a car using a genetic algorithm. A set of predefined parameters is provided to the algorithm, which then iterates through multiple generations, continuously improving until an optimal solution is found.",
        usage: "To begin, navigate to the Data Visualization page. There, you can define the relevant parameters and start the simulation. If you wish to analyze a specific generation in more detail, you can select it from the drop-down menu.",
        graphs: "The overview graph displays all members of the population, organized by generation and consumption. The generation-specific graph provides a more detailed view, where each member of a generation is represented by three points—one for each of the three gears. These points are positioned based on their gear and elasticity."
    };

    const easyFAQ = {
        purpose: "This simulation helps find the best car settings using a genetic algorithm. It improves over multiple rounds until it finds a good solution.",
        usage: "Go to the Data Visualization page. There, you can set parameters and start the simulation. You can also choose a past round to look at in detail.",
        graphs: "The first graph shows all results, sorted by round and fuel use. Another graph shows more details, where each car is marked by three points—one per gear."
    };

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
                <div className={styles.wrapper}>
                <img src="/intro.png" alt="a picture that shows graphs of simulations" className={styles.fullWidthImage}/>
                    <p className={styles.introText}>{easySpeech ? easyP1: normalP1}</p>

                <div className={styles.pictureContainer}>
                    <img src="/example.png" className={styles.image} alt="Example Data Visaulization"/>

                </div>
                    <p className={styles.introText}>{easySpeech ? easyP2: normalP2}</p>

                <GenericButton title="Proceed to Simulation" onClick={clickButton} idd={"home_PTS"}></GenericButton>
                </div>
            </div>

            <div className={styles.faq}>
                <h3 className={styles.smallHeader}>FAQ</h3>
                <details className={styles.details}>
                    <summary className={styles.summary} id={"FAQ1"}>What is the purpose of this simulation?</summary>
                    <p className={styles.detailsText} id={"answer1"}>{easySpeech ? easyFAQ.purpose: normalFAQ.purpose}</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary} id={"FAQ2"}>How do I use the simulation?</summary>
                    <p className={styles.detailsText}id={"answer2"}>{easySpeech ? easyFAQ.usage: normalFAQ.usage}</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary} id={"FAQ3"}>What do the graphs represent?</summary>
                    <p className={styles.detailsText} id={"answer3"}>{easySpeech ? easyFAQ.graphs: normalFAQ.graphs}</p>
                </details>
            </div>
        </div>
    );
}

export default Home;
