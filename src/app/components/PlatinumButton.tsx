import classNames from "classnames";
import React from "react";
import {useSoundDispatch} from "./desktop/PlatinumDesktopSoundManagerContext";
import platinumButtonStyles from "./PlatinumButton.module.scss";

type PlatinumButtonProps = {
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    children?: any;
    buttonType?: "button" | "submit" | "reset";
}

const PlatinumButton: React.FC<PlatinumButtonProps> = ({
                                                           isDefault,
                                                           buttonType = "button",
                                                           disabled = false,
                                                           onClick = null,
                                                           children
                                                       }) => {
    const player = useSoundDispatch();

    return (
        <button type={buttonType}
                className={
                    classNames(
                        platinumButtonStyles.platinumButton,
                        isDefault ? platinumButtonStyles.platinumButtonDefault : ""
                    )
                }
                onClick={onClick}
                onMouseDown={() => {
                    player({type: "PlatinumSoundPlay", sound: "PlatinumButtonClickDown"})
                }}
                onMouseUp={() => {
                    player({type: "PlatinumSoundPlay", sound: "PlatinumButtonClickUp"})
                }}
                disabled={disabled}>
            {children}
        </button>
    );
};
export default PlatinumButton;

