import styles from './Button.module.css';

interface Props {
    title: string;
    onClick: () => void;
}

function VisualizationButton({ title, onClick }: Props) {
    return (
        <button className={styles.visualizationButton} onClick={onClick}>{title}</button>
    );
}

export default VisualizationButton;
