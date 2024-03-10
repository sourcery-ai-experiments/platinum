import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import platinumDisclosureStyles from "@/app/SystemFolder/SystemResources/Disclosure/PlatinumDisclosure.module.scss";
import classNames from "classnames";
import React from "react";

type PlatinumDisclosureTriangleDirections = "up" | "right" | "down" | "left";

type PlatinumDisclosureProps = {
    direction?: PlatinumDisclosureTriangleDirections;
    label?: string;
    children?: any;
}

const PlatinumDisclosure: React.FC<PlatinumDisclosureProps> = (
    {
        direction = "right",
        label = "",
        children
    }
) => {
    const [open, setOpen] = React.useState(false);
    const triangleClassOpenName = "platinumDisclosureTriangle" +
        direction.charAt(0).toUpperCase()
        + direction.slice(1) + (open ? "Open" : "Closed");

    function handleKeyPress(e) {
        switch (e.key) {
            case "Enter":
            case " ": {
                setOpen(!open)
            }
        }
    }

    return (
        <div
            className={classNames(platinumDisclosureStyles.platinumDisclosure)}
        >
            <div className={platinumDisclosureStyles.platinumDisclosureHeader}
                 onClick={() => {
                     setOpen(!open)
                 }}
                 tabIndex={0}
                 onKeyDown={(e) => handleKeyPress(e)}
            >
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.44 11.12"
                     className={classNames(platinumDisclosureStyles.platinumDisclosureTriangle,
                         platinumDisclosureStyles[triangleClassOpenName]
                     )}
                >
                    <polygon className={platinumDisclosureStyles.platinumDisclosureTriangleDropShadow}
                             points="6.44 6.05 1.17 1.07 .93 11.12 6.44 6.05"/>
                    <polygon className={platinumDisclosureStyles.platinumDisclosureTriangleOutline}
                             points="5.68 5.34 0 0 0 10.68 5.68 5.34"/>
                    <polygon className={platinumDisclosureStyles.platinumDisclosureTriangleHighlight}
                             points="4.79 5.34 .76 1.82 .76 8.86 4.79 5.34"/>
                    <polygon className={platinumDisclosureStyles.platinumDisclosureTriangleInner}
                             points="4.79 5.34 1.27 3.42 1.29 8.43 4.79 5.34"/>
                    <polygon className={platinumDisclosureStyles.platinumDisclosureTriangleShadow}
                             points=".76 8.29 .76 8.86 4.79 5.34 4.47 5.05 .76 8.29"/>
                </svg>
                <PlatinumControlLabel label={label}/>
            </div>
            <div className={classNames(
                platinumDisclosureStyles.platinumDisclosureInner,
                open === true ?
                    platinumDisclosureStyles.platinumDisclosureInnerOpen :
                    platinumDisclosureStyles.platinumDisclosureInnerClose
            )}>
                {children}
            </div>
        </div>
    );
};
export default PlatinumDisclosure;

