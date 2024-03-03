import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopSoundManagerContext";
import platinumInputRadioStyles from "@/app/SystemFolder/SystemResources/RadioInput/PlatinumInputRadio.module.scss";
import classNames from "classnames";
import React from "react";

type PlatinumInputRadioProps = {
    id: string;
    name: string;
    checked?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    label?: string;
}

const PlatinumInputRadio: React.FC<PlatinumInputRadioProps> = ({
                                                                   id,
                                                                   name,
                                                                   checked,
                                                                   isDefault,
                                                                   disabled,
                                                                   onClick,
                                                                   label
                                                               }) => {

    const player = useSoundDispatch();

    return (
        <div className={platinumInputRadioStyles.platinumRadioInputGroup}>
            <input type={"radio"} onClick={onClick}
                   onMouseDown={() => {
                       player({type: "PlatinumSoundPlay", sound: "PlatinumInputRadioClickDown"})
                   }}
                   onMouseUp={() => {
                       player({type: "PlatinumSoundPlay", sound: "PlatinumInputRadioClickUp"})
                   }}
                   id={id}
                   name={name}
                   disabled={disabled}
                   className={classNames(
                       platinumInputRadioStyles.platinumRadioInput,
                       isDefault ? platinumInputRadioStyles.platinumRadioInputDefault : ""
                   )}/>
            <PlatinumControlLabel labelFor={id} disabled={disabled} label={label}></PlatinumControlLabel>

        </div>
    );
};
export default PlatinumInputRadio;

