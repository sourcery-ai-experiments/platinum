import platinumControlGroupStyles
    from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup.module.scss";
import React from "react";
import classNames from "classnames";

const PlatinumControlGroup = ({label = "", columns = false, children}) => {
    return (
        <fieldset
            className={classNames(platinumControlGroupStyles.platinumControlGroup,
                columns ?
                    platinumControlGroupStyles.platinumControlGroupColumns :
                    platinumControlGroupStyles.platinumControlGroupNoColumns
            )}>
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

