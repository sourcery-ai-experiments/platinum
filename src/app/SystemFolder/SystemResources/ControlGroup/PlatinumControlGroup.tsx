import platinumInputGroupStyles from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup.module.scss";
import React from "react";

const PlatinumControlGroup = ({label = "", columns = false, children}) => {
    return (
        <fieldset
            className={platinumInputGroupStyles.platinumInputGroup}
            style={{flexGrow: "1"}}>
            {label !== "" &&
                <legend className={platinumInputGroupStyles.platinumInputGroupLegend}>{label}</legend>
            }
            <div className={columns ? platinumInputGroupStyles.platinumInputGroupColumns : ""}>
                {children}
            </div>
        </fieldset>
    );
};
export default PlatinumControlGroup;

