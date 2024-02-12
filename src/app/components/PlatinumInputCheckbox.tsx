import classNames from "classnames";
import React from "react";
import platinumInputCheckboxStyles from "./PlatinumInputCheckbox.module.scss";

type PlatinumInputCheckboxProps = {
    id: string;
    name: string;
    checked?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    label?: string;
}
const PlatinumInputCheckbox: React.FC<PlatinumInputCheckboxProps> = ({
                                                                         id,
                                                                         name,
                                                                         checked,
                                                                         isDefault,
                                                                         disabled,
                                                                         onClick,
                                                                         label
                                                                     }) => {
    return (
        <div className={platinumInputCheckboxStyles.platinumInputCheckboxGroup}>
            <input type={"checkbox"} onClick={onClick}
                   id={id}
                   name={name}
                   disabled={disabled}
                   className={classNames(
                       platinumInputCheckboxStyles.platinumInputCheckbox,
                       isDefault ? platinumInputCheckboxStyles.platinumInputCheckboxDefault : ""
                   )}/>
            <label htmlFor={id}
                   className={classNames(platinumInputCheckboxStyles.platinumInputCheckboxLabel, disabled ? platinumInputCheckboxStyles.platinumInputCheckboxLabelDisabled : "")}>{label}</label>

        </div>
    );
};
export default PlatinumInputCheckbox;

