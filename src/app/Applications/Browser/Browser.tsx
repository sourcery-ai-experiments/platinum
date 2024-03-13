import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/PlatinumAppManagerContext";
import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import PlatinumControlGroup from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup";
import PlatinumInput from "@/app/SystemFolder/SystemResources/Input/PlatinumInput";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Browser = () => {

    const appName = "Browser";
    const appId = "Browser.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/internet-services.png`;

    const desktopEventDispatch = useDesktopDispatch();
    const [appContext] = React.useState({});


    const refAddressBar = React.useRef(null);
    const [iframeSrc, setIframeUrl] = React.useState("https://theoldnet.com");

    const goBook = () => {
        setIframeUrl(
            refAddressBar.current.value
        );
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

    return (
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
                appMenu={appMenu}
                grow={true}
            >
                <PlatinumControlGroup columns={true}>
                    <PlatinumInput id={"browserAddress"} ref={refAddressBar}></PlatinumInput>
                    <PlatinumButton onClick={goBook}>Submit</PlatinumButton>
                </PlatinumControlGroup>
                <iframe
                    title="myBook"
                    src={iframeSrc}
                    height="720"
                    width="1280"
                    allowFullScreen={true}
                    style={{width: "100%", height: "100%", padding: "0", margin: "0"}}
                ></iframe>
            </PlatinumWindow>
        </PlatinumApp>
    );
}

export default Browser;
