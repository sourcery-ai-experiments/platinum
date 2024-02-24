'use client';

import React from "react";
import PlatinumApp from "./PlatinumApp";

const Finder = () => {

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`;
    const appOpen: boolean = true;

    const appMenu = [];

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            debug={false}
            noDesktopIcon={true}
            defaultWindow={""}
        >
        </PlatinumApp>
    );
}

export default Finder;
