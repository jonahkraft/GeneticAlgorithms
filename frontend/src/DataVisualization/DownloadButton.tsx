import React from "react";
import styles from './DataVisualization.module.css';

const DownloadButton: React.FC = () => {
  return (
    <div className={styles["switch-container"]}>
      <label className={styles["switch-label"]}>
        <input type="checkbox" className={styles["switch-input"]} />
        <span className={styles["switch-circle"]}>
          <svg className={styles["switch-icon"]} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
          <div className={styles["switch-square"]} />
        </span>
        <p className={styles["switch-title"]}>Download</p>
        <p className={styles["switch-title"]}>Open</p>
      </label>
    </div>
  );
};

export default DownloadButton;
