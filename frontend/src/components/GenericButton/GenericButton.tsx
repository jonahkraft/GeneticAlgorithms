import styles from './GenericButton.module.css';

interface Props {
    title: string;
    onClick: () => void;
    idd: string;

}

function GenericButton({ title, onClick, idd}: Props) {
    return (
        <button className={styles.GenericButton} onClick={onClick} id={idd}>{title}</button>
    );
}

export default GenericButton;
