import styles from './UploadButton.module.css';

/*
function UploadButton(){
    return <div className={styles.container}>
        <label className={styles.uploadLabel} htmlFor="csvFileInput">
            Upload CSV-File:
        </label>
        <input className={styles.uploadInput} type="file" onChange={uploadCSV} accept=".csv"/>
    </div>
}
*/

interface UploadButtonProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // onChange erwartet jetzt das Event
}

function UploadButton({ onChange }: UploadButtonProps) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <input
                    type="file"
                    accept=".csv"
                    className={styles.input}
                    onChange={onChange}  // Hier wird der Handler korrekt übergeben
                />
                <span className={styles.circle}>
                    <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                    </svg>
                    <div className={styles.square} />
                </span>
                <p className={styles.title}>Upload</p>
            </label>
        </div>
    );
}

export default UploadButton;