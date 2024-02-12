import classNames from "classnames";
import React from "react";
import platinumButtonStyles from "./PlatinumButton.module.scss";

type PlatinumButtonProps = {
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    children?: any;
}

const PlatinumButton: React.FC<PlatinumButtonProps> = ({isDefault, disabled = false, onClick = null, children}) => {
    return (
        <button onClick={onClick}
                disabled={disabled}
                className={classNames(platinumButtonStyles.platinumButton, isDefault ? platinumButtonStyles.platinumButtonDefault : "")}>{children}</button>
    );
};
export default PlatinumButton;

