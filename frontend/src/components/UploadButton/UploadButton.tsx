import styles from './UploadButton.module.css';
import { placeholderButtonFunction } from "../../pages/DataVisualization/ButtonFunctions.ts";

function UploadButton(){
    return <div className={styles.container}>
        <button className={styles.uploadButton} onClick={placeholderButtonFunction}>Upload</button>
    </div>
}

export default UploadButton;