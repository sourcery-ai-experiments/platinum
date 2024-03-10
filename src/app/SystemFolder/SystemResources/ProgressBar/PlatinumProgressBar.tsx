import platinumProgressStyles from "@/app/SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar.module.scss";
import classNames from "classnames";
import React from "react";

interface PlatinumProgressProps {
    value?: number;
    max?: number;
    indeterminate?: boolean;
}

const PlatinumProgressBar: React.FC<PlatinumProgressProps> = ({max = 100, value = 0, indeterminate}) => {

    if (indeterminate) {
        max = 100;
        value = 100;
    }

    return (
        <div
            className={classNames(
                platinumProgressStyles.platinumProgress,
                indeterminate ?
                    platinumProgressStyles.platinumProgressIndeterminate :
                    platinumProgressStyles.platinumProgressDeterminate
            )}>
            <progress max={max} value={value}/>
        </div>
    )
};

export default PlatinumProgressBar;

