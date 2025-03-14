import styles from './GenericButton.module.css';

interface Props {
    disabled?: boolean,
    title: string;
    onClick: () => void;
    idd: string;

}

function GenericButton({ disabled, title, onClick, idd}: Props) {
    return (
        <button disabled={disabled} className={styles.GenericButton} onClick={onClick} id={idd}>{title}</button>
    );
}

export default GenericButton;
