import classNames from "classnames";
import React from "react";
import {useSoundDispatch} from "./desktop/PlatinumDesktopSoundManagerContext";
import platinumInputRadioStyles from "./PlatinumInputRadio.module.scss";

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
            <label htmlFor={id}
                   className={classNames(platinumInputRadioStyles.platinumRadioInputLabel, disabled ? platinumInputRadioStyles.platinumRadioInputLabelDisabled : "")}>{label}</label>

        </div>
    );
};
export default PlatinumInputRadio;

