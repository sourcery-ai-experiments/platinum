'use client';

import AppearanceManagerContext from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManagerContext";
import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import PlatinumInputCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumInputCheckbox";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext";
import PlatinumDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/PlatinumDisclosure";
import PlatinumDropdown from "@/app/SystemFolder/SystemResources/DropDown/PlatinumDropDown";
import PlatinumInput from "@/app/SystemFolder/SystemResources/Input/PlatinumInput";
import PlatinumInputGroup from "@/app/SystemFolder/SystemResources/InputGroup/PlatinumInputGroup";
import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import PlatinumProgressBar from "@/app/SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar";
import PlatinumInputRadio from "@/app/SystemFolder/SystemResources/RadioInput/PlatinumInputRadio";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Demo: React.FC = () => {
    const appName = "Demo";
    const appId = "Demo.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/folders/default.png`;

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
                    appMenu={appMenu}
                >
                    <PlatinumDropdown
                        id={"select_theme"}
                        small={false}
                        options={[{value: "hello", label: "Hello"}, {value: "hello2", label: "Hello again!"}]}
                        selected={"hello"}
                    />
                    <PlatinumProgressBar value={59}></PlatinumProgressBar>
                    <PlatinumInput id={"test"} labelTitle={"Text Input"}></PlatinumInput>
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
                                               disabled={false}/>
                        <PlatinumInputCheckbox id={"test5"} name={"test_check"} isDefault={false}
                                               label={"Checkbox 2"}
                                               disabled={false}/>
                        <PlatinumInputCheckbox id={"test6"} name={"test_check"} isDefault={false} label={"Disabled"}
                                               disabled={true}/>
                    </PlatinumInputGroup>
                    <PlatinumDisclosure label={"Expandable Section"}>
                        <p style={{fontFamily: "var(--header-font)"}}>HELLO!</p>
                    </PlatinumDisclosure>
                    <PlatinumButton isDefault={true}>Do Nothing</PlatinumButton>
                    <PlatinumButton isDefault={false} onClick={quitApp}>Quit</PlatinumButton>
                    <PlatinumButton isDefault={false} disabled={true}>Disabled</PlatinumButton>

                </PlatinumWindow>
            </PlatinumApp>
        </>
    );
}

export default Demo;
