import styles from './HistoryButton.module.css';
import placeholderButtonFunction from "../DataVisualization/ButtonFunctions.ts";

function HistoryButton(){
    return <div className={styles.container}>
        <button className={styles.historyButton} onClick={placeholderButtonFunction}>History</button>
    </div>
}

export default HistoryButton;
