import React from "react";
import platinumButtonStyles from "./PlatinumButton.module.scss";
import classNames from "classnames";

const PlatinumButton = ({isDefault, disabled, onClick, children}) => {
    return (
        <button onClick={onClick}
                disabled={disabled}
                className={classNames(platinumButtonStyles.platinumButton, isDefault ? platinumButtonStyles.platinumButtonDefault : "")}>{children}</button>
    );
};
export default PlatinumButton;

