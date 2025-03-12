import styles from './UploadButton.module.css';
import { uploadCSV } from "../../pages/DataVisualization/ButtonFunctions.ts";

function UploadButton(){
    return <div className={styles.container}>
        <label className={styles.uploadLabel} htmlFor="csvFileInput">
            Upload CSV-File:
        </label>
        <input className={styles.uploadInput} type="file" onChange={uploadCSV} accept=".csv"/>
    </div>
}

export default UploadButton;