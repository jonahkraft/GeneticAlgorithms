import styles from './ProtocolButton.module.css';
import placeholderButtonFunction from "../DataVisualization/ButtonFunctions.ts";

function ProtocolButton(){
    return <div className={styles.container}>
        <button className={styles.protocolButton} onClick={placeholderButtonFunction}>Protcol</button>
    </div>
}

export default ProtocolButton;