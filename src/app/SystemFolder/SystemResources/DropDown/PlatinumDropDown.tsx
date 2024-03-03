import platinumDropDownStyle from "@/app/SystemFolder/SystemResources/DropDown/PlatinumDropDown.module.scss";
import classNames from "classnames";
import React from "react";

type PlatinumDropdownOptions = {
    value: string;
    label: string;
}

type PlatinumDropdownProps = {
    id: string;
    options: PlatinumDropdownOptions[];
    selected?: string;
    small?: boolean;
    onChangeFunc?: any;
}
const PlatinumDropdown: React.FC<PlatinumDropdownProps> = (
    {
        id,
        options,
        selected,
        small = false,
        onChangeFunc
    }
) => {
    return (
        <div className={classNames(
            platinumDropDownStyle.platinumDropDown,
            small ? platinumDropDownStyle.platinumDropDownSmall : ""
        )}>
            <select
                id={id}
                value={selected}
                onChange={onChangeFunc}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
};
export default PlatinumDropdown;
