import classNames from "classnames";
import React from "react";
import platinumButtonStyles from "./PlatinumButton.module.scss";
import {useSoundDispatch} from "./PlatinumDesktopSoundContext";

type PlatinumButtonProps = {
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    children?: any;
}

const PlatinumButton: React.FC<PlatinumButtonProps> = ({isDefault, disabled = false, onClick = null, children}) => {
    const player = useSoundDispatch();

    return (
        <button onClick={onClick}
                onMouseDown={() => {
                    player({type: "PlatinumSoundPlay", sound: "PlatinumClick"})
                }}
                disabled={disabled}
                className={classNames(platinumButtonStyles.platinumButton, isDefault ? platinumButtonStyles.platinumButtonDefault : "")}>{children}</button>
    );
};
export default PlatinumButton;

