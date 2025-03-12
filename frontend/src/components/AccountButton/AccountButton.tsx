import { useState } from 'react';
import cookies from "../../cookies.ts";
import styles from "./AccountButton.module.css";

interface AccountData {
    username: string;
    role: string;
}

function AccountButton() {
    const [isTextVisible, setIsTextVisible] = useState<boolean>(false);
    const [data, setData] = useState<AccountData>({
        username: "",
        role: ""
    });

    const toggleTextVisibility = () => {
        setIsTextVisible((prev) => !prev);
        const cookiesData = cookies.getCookies();
        setData({
            username: cookiesData.username,
            role: cookiesData.role
        });
    };

    return (
        <div className={styles.accountContainer}>
            <button onClick={toggleTextVisibility} className={styles.accountBtn}>
                Account Information
            </button>

            {isTextVisible && (
                <div className={styles.accountInfo}>
                    <p className={styles.accountInfoText}><b>Username:</b> {data.username}</p>
                    <p className={styles.accountInfoText}><b>Role:</b> {data.role}</p>
                </div>
            )}
        </div>
    );
}

export default AccountButton