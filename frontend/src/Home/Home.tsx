import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <br/><br/>
            <div className={styles.mainContent}>
                <h2 className={styles.header}>Welcome to the Simulation</h2>
                <p className={styles.introText}>
                    Evolution: The driving force for diversity and adaptation on our planet. Natural selection ensures that only the strongest survive and pass on the secret of their success to their children.
                </p>
                <p className={styles.introText}>
                    Our simulation uses these same principles in the form of genetic algorithms to find the optimal balance between performance and consumption in vehicles.
                </p>
                <p className={styles.introText}>
                    For each configuration of parameters, the program returns the Pareto front, a collection of solutions where no value can be improved without worsening another.
                </p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={clickButton}>Proceed to Simulation</button>
                </div>
            </div>

            <div className={styles.faq}>
                <h3 className={styles.smallHeader}>FAQ</h3>
                <details className={styles.details}>
                    <summary className={styles.summary}>What is this simulation about?</summary>
                    <p className={styles.detailsText}>This simulation lets you optimize certain features of a car. For this to happen, a set of Parameters is given to a genetic algotrithm. The algorithm then goes through multiple generations, each one better than the last, until it reaches the optimum.</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary}>How do I use the simulation?</summary>
                    <p className={styles.detailsText}>Fist, you have to go to the Data Visualisation Page. There simply set your Parameters and start the simulation. If you want to take a closer look at a certain generation, you can do that as well. Just pick it from the drop-down menu.</p>
                </details>
                <details className={styles.details}>
                    <summary className={styles.summary}>When i run the simuation i just get that strange graph. What does it mean?</summary>
                    <p className={styles.detailsText}>In the overview graph you get all members of the population sortet by generation and consuption. In the generation specific graph, each member of the generation gets three points, one for every one of the three gears. These are positioned according to their gear and their elasticity.</p>
                </details>
            </div>
            <Footer />
        </div>
    );
}

function clickButton() {
    window.location.href = "../../visualization.html";
}

export default Home;
