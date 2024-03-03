import platinumControlLabelStyles
    from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel.module.scss";
import classNames from "classnames";
import React from "react";

interface PlatinumControlLabelProps {
    labelFor?: string;
    label?: string;
    disabled?: boolean;
    direction?: string;
}

const PlatinumControlLabel: React.FC<PlatinumControlLabelProps> = ({
                                                                       labelFor = "",
                                                                       label = "",
                                                                       disabled = false,
                                                                       direction = "left"
                                                                   }) => {

    let directionClass = "";
    switch (direction) {
        case "left": {
            directionClass = platinumControlLabelStyles.platinumControlLabelLeft;
            break;
        }
        case "right": {
            directionClass = platinumControlLabelStyles.platinumControlLabelLeft;
            break;
        }
    }

    if (label !== "") {
        return (
            <label htmlFor={labelFor}
                   className={classNames(
                       platinumControlLabelStyles.platinumControlLabel,
                       disabled ? platinumControlLabelStyles.platinumControlLabelDisabled : "",
                       directionClass
                   )}>
                {label}
            </label>

        );
    }
};

export default PlatinumControlLabel;
