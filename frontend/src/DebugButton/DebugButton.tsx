import styles from './DebugButton.module.css';

function DebugButton(){
    return <div className={styles.container}>
        <button className={styles.debugButton}>Debug</button>
    </div>
}

export default DebugButton;
