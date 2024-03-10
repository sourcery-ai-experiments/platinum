import platinumControlGroupStyles
    from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup.module.scss";
import React from "react";

const PlatinumControlGroup = ({label = "", columns = false, children}) => {
    return (
        <fieldset
            className={columns ?
                platinumControlGroupStyles.platinumControlGroupColumns :
                platinumControlGroupStyles.platinumControlGroup
            }>
            {label !== "" &&
                <legend className={platinumControlGroupStyles.platinumControlGroupLegend}>{label}</legend>
            }
            <div className={columns ? platinumControlGroupStyles.platinumControlGroupContentColumns : ""}>
                {children}
            </div>
        </fieldset>
    );
};
export default PlatinumControlGroup;

