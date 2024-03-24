import PlatinumCheckboxStyles from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumCheckbox.module.scss";
import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import classNames from "classnames";
import React from "react";

type PlatinumCheckboxProps = {
    id: string;
    name: string;
    checked?: boolean;
    mixed?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    label?: string;
}
const PlatinumCheckbox: React.FC<PlatinumCheckboxProps> = (
    {
        id,
        name,
        checked,
        mixed,
        isDefault,
        disabled,
        onClick,
        label
    }
) => {

    return (
        <PlatinumControlLabel label={label} labelFor={id} disabled={disabled}>
        <div className={PlatinumCheckboxStyles.PlatinumCheckboxGroup}>
            <input type={"checkbox"} onClick={onClick}
                   tabIndex={0}
                   checked={checked}
                   id={id}
                   name={name}
                   disabled={disabled}
                   className={classNames(
                       PlatinumCheckboxStyles.PlatinumCheckbox,
                       isDefault ? PlatinumCheckboxStyles.PlatinumCheckboxDefault : "",
                       mixed ? PlatinumCheckboxStyles.PlatinumCheckboxMixed : ""
                   )}/>
            </div>
            </PlatinumControlLabel>
    );
};
export default PlatinumCheckbox;

