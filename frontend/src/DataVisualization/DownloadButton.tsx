import styles from "./DownloadButton.module.css";

interface DownloadButtonProps {
    onClick: () => void;  // onClick wird als Prop erwartet
}

function DownloadButton({ onClick }: DownloadButtonProps) {
    return (
        <div className={styles.container} onClick={onClick}>
            <label className={styles.label}>
                <input type="checkbox" className={styles.input} />
                <span className={styles.circle}>
                    <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                    </svg>
                    <div className={styles.square} />
                </span>
                <p className={styles.title}>Download</p>
            </label>
        </div>
    );
}

export default DownloadButton;
