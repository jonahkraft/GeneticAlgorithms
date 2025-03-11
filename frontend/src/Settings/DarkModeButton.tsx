import styles from "../Settings/DarkModeButton.module.css";

function DarkModeButton(){
    return (
        <div className={styles.toggleSwitch}>
            <label className={styles.switchLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.slider}>
                    <div className={styles.square} />
                </span>
            </label>
        </div>
    );
}
export default DarkModeButton;