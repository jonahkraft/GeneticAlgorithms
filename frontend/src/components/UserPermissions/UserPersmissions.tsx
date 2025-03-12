import cookies from "../../cookies.ts";
import VisualizationButton from "../VisualizationButton/VisualizationButton.tsx";
import {placeholderButtonFunction} from "../../pages/DataVisualization/ButtonFunctions.ts";


function UserPersmissions(){
    const role = cookies.getCookies().role
    console.log(role);

    if (role === 'admin') {
        return(
            <>
                <VisualizationButton title="Protocol" onClick={placeholderButtonFunction}/>
                <VisualizationButton title="Debug" onClick={placeholderButtonFunction}/>
                <VisualizationButton title="History" onClick={placeholderButtonFunction}/>
            </>
            )}

    else if (role === 'data_analyst') {
        return(
            <>
                <VisualizationButton title="History" onClick={placeholderButtonFunction}/>
            </>
        )}

    else {
        return(
            <></>
        )}
}

export default UserPersmissions;
