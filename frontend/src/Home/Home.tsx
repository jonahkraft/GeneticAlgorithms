import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
import styles from './Home.module.css';

function Home() {
    return (
        <div>
            <Header />
            
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
                    <p className={styles.detailsText}>This simulation helps you understand the workings of various algorithms used in data analysis.</p>
                </details>

                <details className={styles.details}>
                    <summary className={styles.summary}>How do I use the simulation?</summary>
                    <p className={styles.detailsText}>Simply select an algorithm from the list, and then proceed to the simulation to see the results.</p>
                </details>

                <details className={styles.details}>
                    <summary className={styles.summary}>Can I try multiple algorithms?</summary>
                    <p className={styles.detailsText}>Yes, you can explore different algorithms in sequence or choose the one that fits your needs.</p>
                </details>

            </div>

            <Footer />
        </div>
    );
}

function clickButton() {
    window.location.href="../../visualization.html";
}

export default Home;
