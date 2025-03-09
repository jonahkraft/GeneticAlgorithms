import Header from '../Header/Header.tsx';
import './Home.css';
import Footer from '../Footer/Footer.tsx';

function Home() {
    return (
        <>
            <Header />
            
            <div className="main-content">
                <h2>Welcome to the Simulation</h2>
                <p className="intro-text">
                Evolution: The driving force for diversity and adaptation on our planet. Natural selection ensures that only the strongest survive and pass on the secret of their success to their children.
                </p>
                <p className="intro-text">
                Our simulation uses these same principles in the form of genetic algorithms to find the optimal balance between performance and consumption in vehicles.
                </p>
                <p className="intro-text">
                For each configuration of parameters, the program returns the Pareto front, a collection of solutions where no value can be improved without worsening another.
                </p>
                
                <div className="button-container">
                    <button onClick={_ => clickButton()}>Proceed to Simulation</button>
                </div>
            </div>

            <div className="faq">
                <h3>FAQ</h3>
                <details>
                    <summary>What is this simulation about?</summary>
                    <p>This simulation helps you understand the workings of various algorithms used in data analysis.</p>
                </details>
                <details>
                    <summary>How do I use the simulation?</summary>
                    <p>Simply select an algorithm from the list, and then proceed to the simulation to see the results.</p>
                </details>
                <details>
                    <summary>Can I try multiple algorithms?</summary>
                    <p>Yes, you can explore different algorithms in sequence or choose the one that fits your needs.</p>
                </details>
            </div>

            <Footer />
        </>
    );
}

function clickButton() {
    window.location.href="../../visualization.html";
}

export default Home;
