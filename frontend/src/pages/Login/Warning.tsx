import styles from "./Warning.module.css"

function Warning({ text }: any) {
    return <p className={styles.label}>{text}</p>;
}

export default Warning;
