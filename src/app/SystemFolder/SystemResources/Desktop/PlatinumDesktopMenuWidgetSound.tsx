import platinumDesktopMenuWidgetSoundStyles
    from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenuWidgetSound.module.scss"
import {
    useSound,
    useSoundDispatch
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopSoundManagerContext";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import classNames from "classnames";
import React from 'react';


type PlatinumDesktopMenuWidgetSoundProps = {
    hide?: boolean;
}

const PlatinumDesktopMenuWidgetSound: React.FC<PlatinumDesktopMenuWidgetSoundProps> = (
    {
        hide = false,
    },
) => {

    const soundOnImg = "img/icons/sound-manager/sound-on.png";
    const soundOffImg = "img/icons/sound-manager/sound-off.png";

    const player = useSoundDispatch();
    const playerState = useSound();

    const mute = () => {
        player({
            type: "PlatinumSoundDisable",
            disabled: playerState.disabled.includes("*") ? [] : ["*"],
        });
        return;
    }

    return (
        <>
            {!hide &&
                <li className={
                    classNames(
                        platinumDesktopMenuWidgetSoundStyles.platinumDesktopMenuWidgetSound,
                        platinumMenuStyles.platinumMenuItem,
                        platinumMenuStyles.platinumMenuItemNoImage,
                    )
                }
                    onClick={mute}
                >
                    <img src={playerState.disabled.includes("*") ? soundOffImg : soundOnImg} alt={
                        playerState.disabled.includes("*") ? "Unmute" : "Mute"
                    }/>
                </li>
            }
        </>
    );
};

export default PlatinumDesktopMenuWidgetSound;
