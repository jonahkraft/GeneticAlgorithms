import styles from './UploadButton.module.css';

function UploadButton(){
    return <div className={styles.container}>
        <button className={styles.uploadButton}>Upload</button>
    </div>
}

export default UploadButton;