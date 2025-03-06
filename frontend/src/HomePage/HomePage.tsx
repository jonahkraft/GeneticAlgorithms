import Header from '../Header/Header.tsx';
import './HomePage.css';
import Footer from '../Footer/Footer.tsx';

function HomePage() {
    return (
        <>
            <Header />
            
            <div className="main-content">
                <h2>Welcome to the Simulation</h2>
                <p className="intro-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod felis a nisi fermentum, ut suscipit ante varius. Ut convallis orci vel risus convallis, id tempor libero volutpat.
                </p>
                <p className="intro-text">
                    Curabitur posuere dolor non interdum blandit. Integer tincidunt, arcu sit amet fringilla venenatis, magna tortor gravida erat, ut fringilla purus orci non ipsum. Phasellus vel malesuada ligula.
                </p>
                <p className="intro-text">
                    Sed ac ipsum nec leo vehicula dapibus. Etiam viverra lectus vitae est consectetur, ac lobortis purus egestas. Vivamus a nibh sit amet justo tincidunt sollicitudin. Duis auctor metus id augue vulputate fermentum.
                </p>
                
                <div className="button-container">
                    <button>Proceed to Simulation</button>
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

export default HomePage;
