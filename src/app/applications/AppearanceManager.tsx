'use client';

import * as React from "react";
import {useDesktop, useDesktopDispatch} from '../components/desktop/PlatinumDesktopAppManagerContext';
import {useSoundDispatch} from "../components/desktop/PlatinumDesktopSoundManagerContext";
import PlatinumApp from "../components/PlatinumApp";
import PlatinumAppContext, {defaultAppContext} from "../components/PlatinumAppContext";
import {getTheme} from "../components/PlatinumAppearance";
import PlatinumButton from "../components/PlatinumButton";
import PlatinumDropdown from "../components/PlatinumDropDown";
import PlatinumWindow from "../components/PlatinumWindow";

const AppearanceManager = () => {
    const [appContext, setAppContext] = React.useState(defaultAppContext);

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const player = useSoundDispatch();

    const appName: string = "Appearance Manager";
    const appId: string = "AppearanceManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;

    const themes = desktopContext.availableThemes.map(a => (({id, name}) => ({value: id, label: name}))(a));

    const switchTheme = (e) => {
        changeValue(e);
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });

        let soundTheme = getTheme(e.target.value).sound;
        player({type: "PlatinumSoundLoad", file: soundTheme.file, disabled: soundTheme.disabled});
    };

    const changeValue = (e) => {
        const dataElements = appContext["elements"];
        dataElements[e.target.id] = e.target.value;
        setAppContext({...appContext, elements: dataElements});
    };

    const closeApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon
            }

        });
    };

    const openApp = () => {
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

    const cleanupIcons = () => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconCleanup"
        });
    }

    React.useEffect(() => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconAdd",
            app: {
                id: appId,
                name: appName,
                icon: appIcon
            }
        });
    }, [desktopEventDispatch, appId, appName, appIcon]);

    return (
        <PlatinumAppContext.Provider value={{appContext, setAppContext}}>
            <PlatinumApp
                id={appId}
                name={appName}
                icon={appIcon}
                debug={true}
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
            </PlatinumApp>
        </PlatinumAppContext.Provider>
    );
}

export default AppearanceManager;
