{/*source: universe.io, Switch by mrhydden*/}
{/*https://uiverse.io/mrhyddenn/old-fish-66*/}
import styles from './ToggleButton.module.css';


function ToggleButton(){
    return (
        <div>
            <label className = {styles.switch}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.slider}/>
            </label>
        </div>
    );
}

export default ToggleButton;
