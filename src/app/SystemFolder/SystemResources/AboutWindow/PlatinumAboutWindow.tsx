import appearanceManagerStyles from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManager.module.scss";
import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";

type PlatinumAboutWindowProps = {
    appId: string;
    appName: string;
    appIcon: string;
    hideFunc: any;
    appMenu?: any;
}

export const PlatinumAboutWindow: React.FC<PlatinumAboutWindowProps> = ({
                                                                            appId,
                                                                            appName,
                                                                            appIcon,
                                                                            hideFunc,
                                                                            appMenu
                                                                        }) => {

    return (
        <PlatinumWindow
            id="AppearanceManager_about"
            appId={appId}
            closable={false}
            resizable={false}
            zoomable={false}
            scrollable={false}
            collapsable={false}
            initialSize={[0, 0]}
            initialPosition={[50, 50]}
            modalWindow={true}
            appMenu={appMenu}
        >
            <div className={appearanceManagerStyles.appearanceManagerAbout}>
                <img src={appIcon} alt="About"/>
                <h1>{appName}</h1>
                <h5>Not Copyright 1998 Apple Computer, Inc.</h5>
                <PlatinumButton onClick={hideFunc}>
                    OK
                </PlatinumButton>
            </div>
        </PlatinumWindow>
    )
}
