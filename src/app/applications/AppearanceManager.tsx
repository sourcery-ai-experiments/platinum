'use client';

import * as React from "react";
import PlatinumApp from "../components/PlatinumApp";
import PlatinumAppContext, {defaultAppContext} from "../components/PlatinumAppContext";
import {getTheme} from "../components/PlatinumAppearance";
import PlatinumButton from "../components/PlatinumButton";
import {useDesktop, useDesktopDispatch} from '../components/PlatinumDesktopContext';
import PlatinumDesktopIcon from "../components/PlatinumDesktopIcon";
import {useSoundDispatch} from "../components/PlatinumDesktopSoundContext";
import PlatinumDropdown from "../components/PlatinumDropDown";
import PlatinumInput from "../components/PlatinumInput";
import PlatinumInputCheckbox from "../components/PlatinumInputCheckbox";
import PlatinumInputGroup from "../components/PlatinumInputGroup";
import PlatinumInputRadio from "../components/PlatinumInputRadio";
import PlatinumProgress from "../components/PlatinumProgress";
import PlatinumWindow from "../components/PlatinumWindow";

const AppearanceManager = () => {
    const [appContext, setAppContext] = React.useState(defaultAppContext);
    const [appOpen, setAppOpen] = React.useState(false);

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const player = useSoundDispatch();

    const appName = "Appearance Manager";
    const appId = "AppearanceManager.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;

    const themes = desktopContext.availableThemes.map(a => (({id, name}) => ({value: id, label: name}))(a));

    const switchTheme = (e) => {
        changeValue(e);
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });

        let soundTheme = getTheme(e.target.value).sound;
        player({type: "PlatinumSoundLoad", file: soundTheme.file, disabled: soundTheme.disabled})
    };

    const changeValue = (e) => {
        const dataElements = appContext["elements"];
        dataElements[e.target.id] = e.target.value;
        setAppContext({...appContext, elements: dataElements});
    };

    const closeApp = (e) => {
        setAppOpen(false);
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon
            }

        });
    };

    const openApp = (e) => {
        setAppOpen(true);
        desktopEventDispatch({
            type: "PlatinumAppOpen",
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
                    id: "close",
                    title: "Close",
                    onClickFunc: closeApp
                }
            ]
        },
    ];

    return (
        <PlatinumAppContext.Provider value={{appContext, setAppContext}}>
            <PlatinumDesktopIcon
                appId={appId}
                appName={appName}
                icon={appIcon}
                onDoubleClickFunc={openApp}
                initialPosition={[10, 60]}
            />
            <PlatinumApp
                id={appId}
                name={appName}
                icon={appIcon}
                debug={true}
                hidden={!appOpen}
                open={true}
            >
                {appOpen &&
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
                    </PlatinumWindow>
                }
            </PlatinumApp>
        </PlatinumAppContext.Provider>
    );
}

export default AppearanceManager;
