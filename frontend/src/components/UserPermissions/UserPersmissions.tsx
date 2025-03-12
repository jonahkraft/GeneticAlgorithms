import cookies from "../../cookies.ts";
import GenericButton from "../GenericButton/GenericButton.tsx";
import {placeholderButtonFunction} from "../../pages/DataVisualization/ButtonFunctions.ts";


function UserPersmissions(){
    const role = cookies.getCookies().role

    if (role === 'administrator') {
        return(
            <>
                <GenericButton title="Protocol" onClick={placeholderButtonFunction}/>
                <GenericButton title="Debug" onClick={placeholderButtonFunction}/>
                <GenericButton title="History" onClick={placeholderButtonFunction}/>
            </>
            )}

    else if (role === 'data_analyst') {
        return(
            <>
                <GenericButton title="History" onClick={placeholderButtonFunction}/>
            </>
        )}

    else {
        return(
            <></>
        )}
}

export default UserPersmissions;
