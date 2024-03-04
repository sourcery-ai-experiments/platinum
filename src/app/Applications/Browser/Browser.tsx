'use client';

import AppearanceManagerContext from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManagerContext";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext";
import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Browser = () => {

    const appName = "Browser";
    const appId = "Browser.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/internet-services.png`;

    const desktopEventDispatch = useDesktopDispatch();
    const {appContext} = React.useContext(AppearanceManagerContext);

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

    return (
        <>
            <PlatinumApp
                id={appId}
                name={appName}
                icon={appIcon}
                defaultWindow={"demo"}
                appContext={appContext}
            >
                <PlatinumWindow
                    id={"demo"}
                    title={appName}
                    appId={appId}
                    scrollable={false}
                    initialSize={[100, 500]}
                    initialPosition={[100, 100]}
                    appMenu={appMenu}>
                    <iframe src={"https://theoldnet.com/"}
                            style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>
                </PlatinumWindow>
            </PlatinumApp>
        </>
    );
}

export default Browser;
