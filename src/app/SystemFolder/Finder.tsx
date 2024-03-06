import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import React from "react";

const Finder = () => {

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`;

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
            defaultWindow={""}
        >
        </PlatinumApp>
    );
}

export default Finder;
