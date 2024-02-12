import classNames from "classnames";
import React from "react";
import platinumInputGroupStyles from "./PlatinumInputGroup.module.scss";

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

