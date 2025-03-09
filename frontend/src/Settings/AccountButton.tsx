import { useState } from 'react';
import cookies from "../cookies.ts";

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
        <div className="account-container">
            <button onClick={toggleTextVisibility} className="account-btn">
                Account Information
            </button>

            {isTextVisible && (
                <div className="account-info">
                    <p><b>Username:</b> {data.username}</p>
                    <p><b>Role:</b> {data.role}</p>
                </div>
            )}
        </div>
    );
}

export default AccountButton