import platinumIconStyles from "@/app/SystemFolder/SystemResources/Icon/PlatinumIcon.module.scss";
import classNames from "classnames";
import React from "react";

interface PlatinumIconProps {
    appId: string;
    name: string;
    icon: string;
    initialPosition: [number, number];
    label?: string;
    kind?: "app_shortcut";
    onClickFunc?: any;
}

const PlatinumIcon: React.FC<PlatinumIconProps> = ({
                                                       appId,
                                                       name,
                                                       icon,
                                                       label,
                                                       kind = "app_shortcut",
                                                       onClickFunc,
                                                   }) => {

    const [position, setPosition] = React.useState<[number, number]>([0, 0]);
    const [clickPosition, setClickPosition] = React.useState<[number, number]>([0, 0]);
    const [dragging, setDragging] = React.useState<boolean>(false);
    const [active, setActive] = React.useState<boolean>(false);

    const iconRef = React.useRef(null);

    const id = appId + ".shortcut";

    const setFocus = () => {
        setActive(!active);
    }

    return (
        <div ref={iconRef} id={`${id}`}
             draggable={false}
             className={classNames(
                 platinumIconStyles.platinumIcon,
                 dragging ? platinumIconStyles.platinumIconDragging : "",
                 active ? platinumIconStyles.platinumIconActive : ""
             )}
             style={{top: position[0], left: position[1]}}
             onClick={setFocus}
             onDoubleClick={onClickFunc}
        >
            <div className={platinumIconStyles.platinumIconMaskOuter}
                 style={{maskImage: `url(${icon})`}}>
                <div
                    className={platinumIconStyles.platinumIconMask}
                    style={{mask: `url(${icon})`}}>
                    <img src={icon} alt={name}/>
                </div>
            </div>
            <p>{label ? label : name}</p>
        </div>
    );
};

export default PlatinumIcon;
