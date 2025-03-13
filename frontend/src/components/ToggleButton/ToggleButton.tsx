/*source: universe.io, Switch by mrhydden*/
/*https://uiverse.io/mrhyddenn/old-fish-66*/
/*modified*/
import { useState, useEffect } from 'react';
import styles from './ToggleButton.module.css';
import cookies from "../../cookies.ts";

interface ToggleButtonProps {
    initialChecked: boolean;
}

function ToggleButton({ initialChecked }: ToggleButtonProps) {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const updateCookies = async () => {
            const currentCookies = cookies.getCookies();
            currentCookies.easy_speech = isChecked;
            cookies.saveCookies(currentCookies);
        };
        updateCookies();
    }, [isChecked]);

    return (
        <div>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <span className={styles.slider} />
            </label>
        </div>
    );
}

export default ToggleButton;