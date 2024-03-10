import platinumBootStyles from "@/app/SystemFolder/SystemResources/Boot/PlatinumBoot.module.scss";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import classNames from "classnames";
import React from "react";

const PlatinumBoot: React.FC = () => {
    const player = useSoundDispatch();
    player({type: "PlatinumSoundPlay", sound: "PlatinumBoot"})

    return (
        <div className={classNames(platinumBootStyles.platinumBoot)}/>
    );
};

export default PlatinumBoot;
