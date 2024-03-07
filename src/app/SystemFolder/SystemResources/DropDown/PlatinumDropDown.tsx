import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import platinumDropDownStyle from "@/app/SystemFolder/SystemResources/DropDown/PlatinumDropDown.module.scss";
import classNames from "classnames";
import React from "react";

type PlatinumDropdownOptions = {
    value: string;
    label: string;
}

type PlatinumDropdownProps = {
    id: string;
    label?: string;
    options: PlatinumDropdownOptions[];
    selected?: string;
    small?: boolean;
    onChangeFunc?: any;
}
const PlatinumDropdown: React.FC<PlatinumDropdownProps> = (
    {
        id,
        label,
        options,
        selected,
        small = false,
        onChangeFunc
    }
) => {
    return (
        <div className={platinumDropDownStyle.platinumDropDownWrapper}>
            {label &&
                <PlatinumControlLabel label={label}></PlatinumControlLabel>
            }
            <div style={{flexGrow: "2"}}
                 className={classNames(
                     platinumDropDownStyle.platinumDropDown,
                     small ? platinumDropDownStyle.platinumDropDownSmall : ""
                 )}>
                <select
                    id={id}
                    tabIndex={0}
                    value={selected}
                    onChange={onChangeFunc}>
                    {options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default PlatinumDropdown;
