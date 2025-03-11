import styles from './DebugButton.module.css';
import placeholderButtonFunction from "../DataVisualization/ButtonFunctions.ts";

function DebugButton(){
    return <div className={styles.container}>
        <button className={styles.debugButton} onClick={placeholderButtonFunction}>Debug</button>
    </div>
}

export default DebugButton;
