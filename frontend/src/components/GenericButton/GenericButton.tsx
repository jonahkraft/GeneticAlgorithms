import styles from './GenericButton.module.css';

interface Props {
    title: string;
    onClick: () => void;
}

function GenericButton({ title, onClick }: Props) {
    return (
        <button className={styles.GenericButton} onClick={onClick}>{title}</button>
    );
}

export default GenericButton;
