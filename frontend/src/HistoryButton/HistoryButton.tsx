import styles from './HistoryButton.module.css';

function HistoryButton(){
    return <div className={styles.container}>
        <button className={styles.historyButton}>History</button>
    </div>
}

export default HistoryButton;
