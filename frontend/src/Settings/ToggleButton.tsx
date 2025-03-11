import styles from '../Settings/ToggleButton.module.css';


function ToggleButton(){
    return (
        <div>
            <label className = {styles.switch}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.slider}/>
            </label>
        </div>
    );
};

export default ToggleButton;
