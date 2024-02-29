'use client';

import React from "react";
import {useDesktop, useDesktopDispatch} from '../Desktop/PlatinumDesktopAppManagerContext';
import {useSoundDispatch} from "../Desktop/PlatinumDesktopSoundManagerContext";
import PlatinumApp from "../PlatinumApp";
import {getTheme} from "../PlatinumAppearance";
import PlatinumButton from "../PlatinumButton";
import PlatinumDropdown from "../PlatinumDropDown";
import PlatinumWindow from "../PlatinumWindow";
import AppearanceManagerContext, {defaultAppearanceManagerContext} from "./AppearanceManagerContext";

const AppearanceManager = () => {

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const player = useSoundDispatch();

    const appName: string = "Appearance Manager";
    const appId: string = "AppearanceManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;

    const themes = desktopContext.availableThemes.map(a => (({id, name}) => ({value: id, label: name}))(a));

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
            id: "file",
            title: "File",
            menuChildren: [
                {
                    id: appId + "_quit",
                    title: "Quit",
                    onClickFunc: quitApp
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
                debug={true}
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
                        small={false}
                        options={themes}
                        onChangeFunc={switchTheme}
                        selected={desktopContext.activeTheme || "default"}
                    />
                    <PlatinumButton onClick={cleanupIcons}>Cleanup Icons</PlatinumButton>
                </PlatinumWindow>
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
                    <div style={{alignContent: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                    fontFamily: "var(--header-font"}}>
                    <img src={appIcon} alt="About" />
                    <h1>Appearance Manager</h1>
                    <h5>Not Copyright 1998 Apple Computer, Inc.</h5>
                    </div>
                </PlatinumWindow>
            </PlatinumApp>
        </AppearanceManagerContext.Provider>
    );
}

export default AppearanceManager;
