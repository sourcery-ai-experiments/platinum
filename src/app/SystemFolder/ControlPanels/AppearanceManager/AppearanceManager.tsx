"use client";

import {getTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import appearanceManagerStyles from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManager.module.scss";
import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import PlatinumCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumCheckbox";
import PlatinumControlGroup from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup";
import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import {
    useDesktop,
    useDesktopDispatch,
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext";
import {
    PlatinumDesktopSoundInfo,
    useSound,
    useSoundDispatch,
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopSoundManagerContext";
import PlatinumDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/PlatinumDisclosure";
import PlatinumPopUpMenu from "@/app/SystemFolder/SystemResources/PopUpMenu/PlatinumPopUpMenu";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

export const AppearanceManager: React.FC = () => {
    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const playerState = useSound();
    const player = useSoundDispatch();

    const appName: string = "Appearance Manager";
    const appId: string = "AppearanceManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;

    const [showAbout, setShowAbout] = React.useState(false);

    const [enableAllSounds, setEnableAllSounds] = React.useState(false);
    const themesList = desktopContext.availableThemes.map((a: any) =>
        (({id, name}) => ({value: id, label: name}))(a),
    );

    const switchTheme = (e) => {
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });
        loadSoundTheme(e.target.value);
    };

    const changeSounds = (e) => {
        setEnableAllSounds(!!e.target.checked);
        player({
            type: "PlatinumSoundDisable",
            disabled: enableAllSounds ? [] : ["*"],
        });
    };


    const loadSoundTheme = (themeName: string) => {
        const soundTheme = getTheme(themeName).sound;
        player({
            type: "PlatinumSoundLoad",
            file: soundTheme.file,
            disabled: soundTheme.disabled,
        });
    };

    const quitApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon,
            },
        });
    };

    const appMenu = [
        {
            id: appId + "_file",
            title: "File",
            menuChildren: [
                {
                    id: appId + "_quit",
                    title: "Quit",
                    onClickFunc: quitApp,
                },
            ],
        },
        {
            id: appId + "_help",
            title: "Help",
            menuChildren: [
                {
                    id: appId + "_about",
                    title: "About",
                    onClickFunc: () => {
                        setShowAbout(true);
                    },
                },
            ],
        },
    ];

    const cleanupIcons = () => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconCleanup",
        });
    };

    const getSoundLabelGroups = () => {
        const soundLabelGroups = [
            ...new Set(playerState.labels.map((item) => item.group)),
        ];

        var index = soundLabelGroups.indexOf("Alert");
        if (index !== -1) {
            soundLabelGroups.splice(index, 1);
        }
        return soundLabelGroups;
    };

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            defaultWindow={"AppearanceManager_1"}
            openOnBoot={true}
        >
            <PlatinumWindow
                id={"AppearanceManager_1"}
                title={appName}
                appId={appId}
                icon={appIcon}
                closable={true}
                resizable={false}
                zoomable={false}
                scrollable={false}
                collapsable={false}
                initialSize={[500, 0]}
                initialPosition={[300, 50]}
                modalWindow={true}
                appMenu={appMenu}
            >
                <PlatinumPopUpMenu
                    id={"select_theme"}
                    label={"Selected Theme"}
                    options={themesList}
                    onChangeFunc={switchTheme}
                    selected={desktopContext.activeTheme || "default"}
                />
                <PlatinumButton onClick={cleanupIcons}>Cleanup Icons</PlatinumButton>
                <PlatinumCheckbox
                    id={"disable_sounds"}
                    name={"disable_sounds"}
                    isDefault={true}
                    label={"Enable Interface Sounds"}
                    onClick={changeSounds}
                    checked={!playerState.disabled.includes("*")}
                />
                <PlatinumDisclosure label={"Disable Sounds"}>
                    <PlatinumControlLabel
                        label={"These settings are not currently connected."}
                    ></PlatinumControlLabel>
                    <div className={appearanceManagerStyles.appearanceManagerControlGroupHolder}>
                        {getSoundLabelGroups().map((group: string) => (
                            <PlatinumControlGroup label={group} columns={true} key={group}>
                                {playerState.labels.map((item: PlatinumDesktopSoundInfo) => (
                                    <>
                                        {item.group === group && (
                                            <PlatinumCheckbox
                                                id={"enable_sound_" + item.id}
                                                name={"enable_sound_" + item.id}
                                                label={item.label}
                                                checked={playerState.disabled.includes("*")}
                                            />
                                        )}
                                    </>
                                ))}
                            </PlatinumControlGroup>
                        ))}
                    </div>
                </PlatinumDisclosure>
            </PlatinumWindow>
            {showAbout && (
                <PlatinumWindow
                    id="AppearanceManager_about"
                    appId={appId}
                    closable={false}
                    resizable={false}
                    zoomable={false}
                    scrollable={false}
                    collapsable={false}
                    initialSize={[300, 300]}
                    initialPosition={[50, 50]}
                    modalWindow={true}
                    appMenu={appMenu}
                >
                    <div className={appearanceManagerStyles.appearanceManagerAbout}>
                        <img src={appIcon} alt="About"/>
                        <h1>{appName}</h1>
                        <h5>Not Copyright 1998 Apple Computer, Inc.</h5>
                        <PlatinumButton onClick={() => {
                            setShowAbout(false)
                        }}>
                            OK
                        </PlatinumButton>
                    </div>
                </PlatinumWindow>
            )}
        </PlatinumApp>
    );
};
