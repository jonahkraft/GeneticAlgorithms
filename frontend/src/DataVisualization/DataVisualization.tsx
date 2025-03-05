import Header from "../Header/Header.tsx"
import ReactDOM from 'react-dom/client'

function DataVisualization() {
    return (
        <>
            <Header />
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root_data_visualization')!).render(<DataVisualization></DataVisualization>);
