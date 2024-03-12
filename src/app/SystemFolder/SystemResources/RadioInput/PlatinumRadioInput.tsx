import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import platinumRadioInputStyles from "@/app/SystemFolder/SystemResources/RadioInput/PlatinumRadioInput.module.scss";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import classNames from "classnames";
import React, {MouseEventHandler} from "react";

type PlatinumRadioInputProps = {
    id: string;
    name: string;
    checked?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    label?: string;
}

const PlatinumRadioInput: React.FC<PlatinumRadioInputProps> = ({
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
        <div className={platinumRadioInputStyles.platinumRadioInputGroup}>
            <div className={platinumRadioInputStyles.platinumRadioInputWrapper}>
                <input type={"radio"} onClick={onClick}
                       tabIndex={0}
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
                           platinumRadioInputStyles.platinumRadioInput,
                           isDefault ? platinumRadioInputStyles.platinumRadioInputDefault : ""
                       )}/>
            </div>
            <PlatinumControlLabel labelFor={id} disabled={disabled} label={label}></PlatinumControlLabel>

        </div>
    );
};
export default PlatinumRadioInput;

