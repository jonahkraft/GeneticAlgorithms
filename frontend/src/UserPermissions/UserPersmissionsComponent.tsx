import cookies from "../cookies.ts";
import ProtocolButton from "../ProtocolButton/ProtocolButton.tsx";
import DebugButton from "../DebugButton/DebugButton.tsx";
import HistoryButton from "../HistoryButton/HistoryButton.tsx";

function UserPersmissionsComponent(){
    const role = cookies.getCookies().role
    console.log(role);

    if (role === 'admin') {
        return <>
            <ProtocolButton></ProtocolButton>
            <DebugButton></DebugButton>
            <HistoryButton></HistoryButton>
        </>
    }

    else if (role === 'data_analyst') {
        return <>
            <HistoryButton></HistoryButton>
        </>
    }

    else {
        return <>
        </>;
    }
}

export default UserPersmissionsComponent;
