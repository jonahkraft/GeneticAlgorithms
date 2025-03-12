import styles from "./Card.module.css"
import {ReactNode} from "react";

type CardProps = {
    children: ReactNode;
};


function Card({ children }: CardProps) {
    return(
        <div className={styles.card}>
            {children}
        </div>
    )
}

export default Card;