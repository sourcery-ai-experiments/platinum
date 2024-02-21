'use client';

import * as React from "react";
import PlatinumApp from "../components/PlatinumApp";
import PlatinumButton from "../components/PlatinumButton";
import {useDesktop, useDesktopDispatch} from "../components/PlatinumDesktopContext";
import PlatinumDropdown from "../components/PlatinumDropDown";
import PlatinumInput from "../components/PlatinumInput";
import PlatinumInputCheckbox from "../components/PlatinumInputCheckbox";
import PlatinumInputGroup from "../components/PlatinumInputGroup";
import PlatinumInputRadio from "../components/PlatinumInputRadio";
import PlatinumProgress from "../components/PlatinumProgress";
import PlatinumWindow from "../components/PlatinumWindow";

const Demo = () => {
    const [appOpen, setAppOpen] = React.useState(false);

    const appName = "Demo";
    const appId = "Demo.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/folders/default.png`;

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

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
        <>
            <PlatinumApp
                id={appId}
                name={appName}
                icon={appIcon}
                debug={false}
            >
                <PlatinumWindow
                    id={"demo"}
                    title={appName}
                    appId={appId}
                    closable={true}
                    resizable={true}
                    zoomable={true}
                    scrollable={false}
                    collapsable={true}
                    initialSize={[100, 500]}
                    initialPosition={[100, 100]}
                    modalWindow={false}>
                    <iframe src={"https://theoldnet.com/"}
                            style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>
                </PlatinumWindow>
                <PlatinumWindow
                    id={"demo2"}
                    title={appName}
                    appId={appId}
                    closable={false}
                    resizable={false}
                    zoomable={false}
                    scrollable={false}
                    collapsable={false}
                    initialSize={[400, 300]}
                    initialPosition={[300, 50]}
                    modalWindow={true}
                >
                    <PlatinumDropdown
                        id={"select_theme"}
                        small={false}
                        options={[{value: "hello", label: "Hello"}, {value: "hello2", label: "Hello again!"}]}
                        selected={"hello"}
                    />
                    <PlatinumProgress value={59}></PlatinumProgress>
                    <PlatinumInput id={"test"}></PlatinumInput>
                    <PlatinumButton isDefault={true} onClick={closeApp}>OK</PlatinumButton>
                    <PlatinumButton isDefault={false}>Nothing</PlatinumButton>
                    <PlatinumButton isDefault={false} disabled={true}>Disabled</PlatinumButton>
                    <PlatinumInputGroup label={"Test Radio Inputs"}>
                        <PlatinumInputRadio id={"test1"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 1"}/>
                        <PlatinumInputRadio id={"test2"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 2"}/>
                        <PlatinumInputRadio id={"test3"} checked={true} name={"test_radio"} isDefault={false}
                                            label={"Radio Button Disabled"} disabled={true}/>
                        <PlatinumInputCheckbox id={"test4"} name={"test_check"} isDefault={true}
                                               label={"Default Checkbox"}
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
