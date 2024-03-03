import platinumInputCheckboxStyles from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumInputCheckbox.module.scss";
import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import classNames from "classnames";
import React from "react";

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
                   checked={checked}
                   name={name}
                   disabled={disabled}
                   className={classNames(
                       platinumInputCheckboxStyles.platinumInputCheckbox,
                       isDefault ? platinumInputCheckboxStyles.platinumInputCheckboxDefault : ""
                   )}/>
            <PlatinumControlLabel label={label} labelFor={id} disabled={disabled}></PlatinumControlLabel>
        </div>
    );
};
export default PlatinumInputCheckbox;

