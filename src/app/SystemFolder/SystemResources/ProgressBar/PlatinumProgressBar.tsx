import platinumProgressStyles from "@/app/SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar.module.scss";
import React from "react";

interface PlatinumProgressProps {
    value: number;
    max?: number;
}

const PlatinumProgressBar: React.FC<PlatinumProgressProps> = ({max = 100, value = 0}) => {

    return (
        <div className={platinumProgressStyles.platinumProgress}>
            <progress max={max} value={value}/>
        </div>
    )
};

export default PlatinumProgressBar;

