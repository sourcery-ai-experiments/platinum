import platinumInputGroupStyles from "@/app/SystemFolder/SystemResources/InputGroup/PlatinumInputGroup.module.scss";
import React from "react";

const PlatinumInputGroup = ({label = "", columns = false, children}) => {
    return (
        <fieldset
            className={columns ?
                platinumInputGroupStyles.platinumInputGroupColumns
                : platinumInputGroupStyles.platinumInputGroup}
            style={{flexGrow: "1"}}>
            {label !== "" &&
                <legend className={platinumInputGroupStyles.platinumInputGroupLegend}>{label}</legend>
            }
            {children}
        </fieldset>
    );
};
export default PlatinumInputGroup;

