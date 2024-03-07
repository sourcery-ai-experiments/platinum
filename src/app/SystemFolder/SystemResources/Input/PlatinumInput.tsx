import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import platinumInputStyles from "@/app/SystemFolder/SystemResources/Input/PlatinumInput.module.scss";
import classNames from "classnames";
import React from "react";

interface PlatinumInputProps {
    id: string;
    inputType?: string;
    onChangeFunc?: any;
    labelTitle?: string;
    placeholder?: string;
    prefillValue?: string;
    disabled?: boolean;
    isDefault?: boolean;
}

const PlatinumInput: React.FC<PlatinumInputProps> = ({
                                                         id,
                                                         inputType = "text",
                                                         labelTitle,
                                                         placeholder,
                                                         prefillValue,
                                                         disabled = false,
                                                         isDefault,
                                                         onChangeFunc
                                                     }) => {

    return (<div className={platinumInputStyles.platinumInputHolder}>
        {labelTitle &&
            <PlatinumControlLabel label={labelTitle} labelFor={id} direction={"left"}
                                  disabled={disabled}></PlatinumControlLabel>
        }
        <input id={id}
               tabIndex={0}
               onChange={onChangeFunc}
               name={id}
               type={inputType}
               disabled={disabled}
               value={prefillValue}
               placeholder={placeholder}
               className={classNames(
                   platinumInputStyles.platinumInput, isDefault ? platinumInputStyles.platinumInputDefault : "")}
        ></input>
    </div>);
};

export default PlatinumInput;
