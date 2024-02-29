import platinumInputGroupStyles from "@/app/SystemFolder/SystemResources/InputGroup/PlatinumInputGroup.module.scss";
import React from "react";

const PlatinumInputGroup = ({label = "", children}) => {
    return (
        <fieldset className={platinumInputGroupStyles.platinumInputGroup}>
            {label !== "" &&
                <legend className={platinumInputGroupStyles.platinumInputGroupLegend}>{label}</legend>
            }
            {children}
        </fieldset>
    );
};
export default PlatinumInputGroup;

