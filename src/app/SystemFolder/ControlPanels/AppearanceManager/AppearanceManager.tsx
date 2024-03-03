'use client';

import {getTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import AppearanceManagerContext from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManagerContext";
import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import {
    useDesktop,
    useDesktopDispatch
} from '@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext';
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopSoundManagerContext";
import PlatinumDropdown from "@/app/SystemFolder/SystemResources/DropDown/PlatinumDropDown";
import PlatinumApp from "@/app/SystemFolder/SystemResources/MacApp/PlatinumApp";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";
import appearanceManagerStyles from "./AppearanceManager.module.scss";

const AppearanceManager = () => {

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const player = useSoundDispatch();

    const appName: string = "Appearance Manager";
    const appId: string = "AppearanceManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;
    const {appContext, setAppContext} = React.useContext(AppearanceManagerContext);
    const themesList = desktopContext.availableThemes.map((a: any) => (({id, name}) => ({value: id, label: name}))(a));


    const [showAbout, setShowAbout] = React.useState(false);
    const switchTheme = (e) => {
        changeElementValue(e);
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });
        loadSoundTheme(e.target.value);
    };

    const loadSoundTheme = (themeName: string) => {
        const soundTheme = getTheme(themeName).sound;
        player({type: "PlatinumSoundLoad", file: soundTheme.file, disabled: soundTheme.disabled});
    }

    const changeElementValue = (e) => {
        const dataElements = appContext["elements"];
        dataElements[e.target.id] = e.target.value;
        setAppContext({...appContext, elements: dataElements});
    };

    const quitApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon
            }

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
                    onClickFunc: quitApp
                }
            ]
        },
        {
            id: appId + "_help",
            title: "Help",
            menuChildren: [
                {
                    id: appId + "_about",
                    title: "About",
                    onClickFunc: () => {setShowAbout(true)}
                }
            ]
        },
    ];

    const cleanupIcons = () => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconCleanup"
        });
    }

    return (
        <AppearanceManagerContext.Provider value={{appContext, setAppContext}}>
            <PlatinumApp
                id={appId}
                name={appName}
                icon={appIcon}
                defaultWindow={"AppearanceManager_1"}
                appContext={appContext}
            >
                <PlatinumWindow
                    id={"AppearanceManager_1"}
                    title={appName}
                    appId={appId}
                    closable={false}
                    resizable={false}
                    zoomable={false}
                    scrollable={false}
                    collapsable={false}
                    initialSize={[300, 100]}
                    initialPosition={[300, 50]}
                    modalWindow={true}
                    appMenu={appMenu}
                >
                    <PlatinumDropdown
                        id={"select_theme"}
                        options={themesList}
                        onChangeFunc={switchTheme}
                        selected={desktopContext.activeTheme || "default"}
                    />
                    <PlatinumButton onClick={cleanupIcons}>Cleanup Icons</PlatinumButton>
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
                            <PlatinumButton onClick={() => {setShowAbout(false)}}>OK</PlatinumButton>
                        </div>
                    </PlatinumWindow>
                )}
            </PlatinumApp>
        </AppearanceManagerContext.Provider>
    );
}

export default AppearanceManager;
