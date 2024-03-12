import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import PlatinumIcon from "@/app/SystemFolder/SystemResources/Icon/PlatinumIcon";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import {BFSRequire, configure} from 'browserfs';
import React from "react";


const Finder = () => {
    // you can also add a callback as the last parameter instead of using promises
    configure({fs: 'LocalStorage'}, () => {
    });

    const fs = BFSRequire('fs');
    fs.mkdir('/test');
    fs.writeFile('/test/test.txt', 'Cool, I can do this in the browser!');
    fs.writeFile('/test3/test.txt', 'Cool, I can do this in the browser!');
    fs.writeFile('/test4/test.txt', 'Cool, I can do this in the browser!');

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`;

    const getRootDirectory = () => {
        let dirs = fs.readdirSync("/");
        return dirs;
    }
    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={false}
            defaultWindow={""}
        >
            <PlatinumWindow
                id={"df_about"}
                title={"/"}
                icon={"/img/icons/folders/default.png"}
                appId={appId}
                initialSize={[300, 300]}
                initialPosition={[50, 50]}
            >
                {getRootDirectory().map((i, idx) => (
                    <PlatinumIcon appId={appId} name={i}
                                  initialPosition={[(idx * 32), (idx * 32)]}
                                  key={"dir_" + i}
                                  icon={"/img/icons/folders/default.png"}></PlatinumIcon>
                ))}
            </PlatinumWindow>
        </PlatinumApp>
    );
}

export default Finder;
