import classNames from "classnames";
import React from "react";
import platinumInputRadioStyles from "./PlatinumInputRadio.module.scss";

const PlatinumInputRadio = ({id, name, checked, isDefault, disabled, onClick, label}) => {
    return (
        <div className={platinumInputRadioStyles.platinumRadioInputGroup}>
            <input type={"radio"} onClick={onClick}
                   id={id}
                   name={name}
                   disabled={disabled}
                   className={classNames(
                       platinumInputRadioStyles.platinumRadioInput,
                       isDefault ? platinumInputRadioStyles.platinumRadioInputDefault : ""
                   )}/>
            <label htmlFor={id}
                   className={classNames(platinumInputRadioStyles.platinumRadioInputLabel, disabled ? platinumInputRadioStyles.platinumRadioInputLabelDisabled : "")}>{label}</label>

        </div>
    );
};
export default PlatinumInputRadio;

