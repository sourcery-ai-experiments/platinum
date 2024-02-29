'use client';

import AppearanceManagerContext from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManagerContext";
import PlatinumInputCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumInputCheckbox";
import {
    useDesktop,
    useDesktopDispatch
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext";
import PlatinumApp from "@/app/SystemFolder/SystemResources/MacApp/PlatinumApp";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";
import PlatinumButton from "../../SystemFolder/SystemResources/Button/PlatinumButton";
import PlatinumDropdown from "../../SystemFolder/SystemResources/DropDown/PlatinumDropDown";
import PlatinumInput from "../../SystemFolder/SystemResources/Input/PlatinumInput";
import PlatinumInputGroup from "../../SystemFolder/SystemResources/InputGroup/PlatinumInputGroup";
import PlatinumProgressBar from "../../SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar";
import PlatinumInputRadio from "../../SystemFolder/SystemResources/RadioInput/PlatinumInputRadio";

const Demo = () => {
    const [appOpen, setAppOpen] = React.useState(false);

    const appName = "Demo";
    const appId = "Demo.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/folders/default.png`;

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();
    const {appContext, setAppContext} = React.useContext(AppearanceManagerContext);

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
                debug={true}
                defaultWindow={"demo"}
                appContext={appContext}
            >
                <PlatinumWindow
                    id={"demo2"}
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
                >
                    <PlatinumDropdown
                        id={"select_theme"}
                        small={false}
                        options={[{value: "hello", label: "Hello"}, {value: "hello2", label: "Hello again!"}]}
                        selected={"hello"}
                    />
                    <PlatinumProgressBar value={59}></PlatinumProgressBar>
                    <PlatinumInput id={"test"}></PlatinumInput>
                    <PlatinumButton isDefault={true} onClick={quitApp}>Quit</PlatinumButton>
                    <PlatinumButton isDefault={false}>Nothing</PlatinumButton>
                    <PlatinumButton isDefault={false} disabled={true}>Disabled</PlatinumButton>
                    <PlatinumInputGroup label={"Test Radio Inputs"}>
                        <PlatinumInputRadio id={"test1"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 1"}/>
                        <PlatinumInputRadio id={"test2"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 2"}/>
                        <PlatinumInputRadio id={"test3"} checked={true} name={"test_radio"} isDefault={false}
                                            label={"Radio Button Disabled"} disabled={true}/>
                    </PlatinumInputGroup>
                    <PlatinumInputGroup label={"Test Checkboxes"}>
                        <PlatinumInputCheckbox id={"test4"} name={"test_check"} isDefault={true}
                                               label={"Default Checkbox"}
                                               checked={true}
                                               disabled={false}/>
                        <PlatinumInputCheckbox id={"test5"} name={"test_check"} isDefault={false}
                                               label={"Checkbox 2"}
                                               disabled={false}/>
                        <PlatinumInputCheckbox id={"test6"} name={"test_check"} isDefault={false} label={"Disabled"}
                                               disabled={true}/>
                    </PlatinumInputGroup>

                </PlatinumWindow>
            </PlatinumApp>
        </>
    );
}

export default Demo;
