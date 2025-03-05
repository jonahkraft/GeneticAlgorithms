import Header from '../Header/Header.tsx'
import './HomePage.css'
import Footer from '../Footer/Footer.tsx'

function HomePage() {
    return (
        <>
            <Header />
            <h2>Hallo Welt</h2>

            <br/>

            <div>
                <button>Algorithmus 1</button>
                <button>Algorithmus 2</button>
                <button>Algorithmus 3</button>
                <button>Algorithmus 4</button>
                <button>Algorithmus 5</button>
            </div>

            <br/>

            <Footer />
        </>
    )
}

export default HomePage
