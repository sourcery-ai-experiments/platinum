import platinumButtonStyles from "@/app/SystemFolder/SystemResources/Button/PlatinumButton.module.scss";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import classNames from "classnames";
import React from "react";

type PlatinumButtonProps = {
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    children?: any;
    buttonShape?: "rectangle" | "square";
    buttonSize?: "medium" | "small";
    buttonType?: "button" | "submit" | "reset";
}

const PlatinumButton: React.FC<PlatinumButtonProps> = ({
                                                           isDefault = false,
                                                           buttonType = "button",
                                                           buttonShape = "rectangle",
                                                           buttonSize,
                                                           disabled = false,
                                                           onClick = null,
                                                           children
                                                       }) => {
    const player = useSoundDispatch();

    return (
        <button type={buttonType}
                tabIndex={0}
                role={buttonType}
                className={
                    classNames(
                        platinumButtonStyles.platinumButton,
                        isDefault ? platinumButtonStyles.platinumButtonDefault : "",
                        buttonShape === "square" ? platinumButtonStyles.platinumButtonShapeSquare : "",
                        buttonSize === "small" ? platinumButtonStyles.platinumButtonSmall : ""
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
