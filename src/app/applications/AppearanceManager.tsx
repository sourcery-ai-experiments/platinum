'use client';

import * as React from "react";
import PlatinumApp from "../components/PlatinumApp";
import PlatinumAppContext, {defaultAppContext} from "../components/PlatinumAppContext";
import PlatinumButton from "../components/PlatinumButton";
import {useDesktop, useDesktopDispatch} from '../components/PlatinumDesktopContext';
import PlatinumDesktopIcon from "../components/PlatinumDesktopIcon";
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

    const appName = "Appearance Manager";
    const appId = "AppearanceManager.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/appearance-manager/app.png`;

    const switchTheme = (e) => {
        changeValue(e);
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });
    };

    const changeValue = (e) => {
        const dataElements = appContext["elements"];
        dataElements[e.target.id] = e.target.value;
        setAppContext({...appContext, elements: dataElements});
    };
    console.log(desktopContext.availableThemes);
    const themes = desktopContext.availableThemes.map(a => (({id, name}) => ({value: id, label: name}))(a));

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

    const testMenuItems = [
        {
            id: "file-new",
            title: "New",
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/mac.png`,
            keyboardShortcut: "&#8984;S",
            disabled: false,
        },
        {
            id: "file-open",
            title: "Open",
            keyboardShortcut: "&#8984;O",
            disabled: true,
        },
        {
            id: "file-print",
            title: "Print",
            keyboardShortcut: "&#8984;P",
            disabled: true,
        },
        {
            id: "file-trash",
            title: "Move to Trash",
            keyboardShortcut: "&#8984;&#9003;",
            disabled: true,
        },
        {
            id: "spacer",
            title: "",
        },
        {
            id: "file-close",
            title: "Close Window",
            keyboardShortcut: "&#8984;W",
            disabled: false,
        },

    ];


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
                        id={"AppearanceManager"}
                        title={appName}
                        appId={appId}
                        closable={false}
                        resizable={false}
                        zoomable={false}
                        scrollable={false}
                        collapsable={false}
                        initialSize={[400, 500]}
                        initialPosition={[300, 50]}
                        modalWindow={true}
                        appMenu={appMenu}
                        contextMenuItems={testMenuItems}
                    >
                        <PlatinumDropdown
                            id={"select_theme"}
                            small={false}
                            options={themes}
                            onChangeFunc={switchTheme}
                            selected={desktopContext.activeTheme || "default"}
                        />
                        <PlatinumProgress value={59}></PlatinumProgress>
                        <PlatinumInput id={"test"}></PlatinumInput>
                        <PlatinumButton isDefault={true} onClick={closeApp}>OK</PlatinumButton>
                        <PlatinumButton isDefault={false}>Nothing</PlatinumButton>
                        <PlatinumButton isDefault={false} disabled={true}>Disabled</PlatinumButton>
                        <PlatinumInputGroup label={"Test Radio Inputs"}>
                            <PlatinumInputRadio id={"test1"} name={"testradio"} isDefault={false}
                                                label={"Radio Button 1"}/>
                            <PlatinumInputRadio id={"test2"} name={"testradio"} isDefault={false}
                                                label={"Radio Button 2"}/>
                            <PlatinumInputRadio id={"test3"} checked={true} name={"testradio"} isDefault={false}
                                                label={"Radio Button Disabled"} disabled={true}/>
                            <PlatinumInputCheckbox id={"test4"} name={"testcheck"} isDefault={true}
                                                   label={"Default Checkbox"}
                                                   disabled={false}/>
                            <PlatinumInputCheckbox id={"test5"} name={"testcheck"} isDefault={false}
                                                   label={"Checkbox 2"}
                                                   disabled={false}/>
                            <PlatinumInputCheckbox id={"test6"} name={"testcheck"} isDefault={false} label={"Disabled"}
                                                   disabled={true}/>
                        </PlatinumInputGroup>

                    </PlatinumWindow>
                }
            </PlatinumApp>
        </PlatinumAppContext.Provider>
    );
}

export default AppearanceManager;
