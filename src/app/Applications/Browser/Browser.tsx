import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/PlatinumAppManagerContext";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Browser = () => {

    const appName = "Browser";
    const appId = "Browser.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/internet-services.png`;

    const desktopEventDispatch = useDesktopDispatch();
    const [appContext] = React.useState({});


    const googleUrl = "https://theoldnet.com";

    const refBook = React.useRef(null);
    const refPage = React.useRef(null);
    const refIframe = React.useRef(null);
    const [iframSrc, setIframeUrl] = React.useState(googleUrl);

    const goBook = () => {
        setIframeUrl(
            `${googleUrl}/b=${refBook.current.value}&p=${refPage.current.value}`
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
                appMenu={appMenu}>
                <input type="number" ref={refBook}></input>
                <input type="number" ref={refPage}></input>
                <button type="button" onClick={goBook}>
                    Submit
                </button>
                <iframe
                    title="myBook"
                    src={iframSrc}
                    height="720"
                    width="1280"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen={true}
                    ref={refIframe}
                    style={{width: "100%", height: "100%", padding: "0", margin: "0"}}
                ></iframe>
            </PlatinumWindow>
        </PlatinumApp>
    );
}

export default Browser;
