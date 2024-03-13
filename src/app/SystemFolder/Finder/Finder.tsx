import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/PlatinumAppManagerContext";
import {PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/FileSystem";
import PlatinumFileBrowser from "@/app/SystemFolder/SystemResources/File/PlatinumFileBrowser";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Finder = () => {

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`;
    let defaultFSContent = {
        "Macintosh HD": {
            "_type": "drive",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/disk.png`,
            "test3.txt": {
                "_type": "file",
                "_mimeType": "",
                "_data": "File Contents",
            },
            "test": {
                "_type": "directory"
            },
            "test2": {
                "_type": "directory",
                "test1.txt": {
                    "_type": "file",
                    "_mimeType": "",
                    "_data": "File Contents"
                },
                "test.txt": {
                    "_type": "file",
                    "_mimeType": "",
                    "_data": "File Contents"
                }
            }
        }
    }

    let fs = new PlatinumFileSystem("", defaultFSContent);
    const desktopEventDispatch = useDesktopDispatch();

    React.useEffect(() => {
        const drives = fs.filterByType("", "drive");
        drives.forEach((d) => {
            desktopEventDispatch({
                type: "PlatinumDesktopIconAdd",
                app: {
                    id: appId,
                    name: d[0],
                    icon: d[1]['_icon']
                }
            });
        });

    }, []);

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
            defaultWindow={"df_about"}>
            <PlatinumWindow
                id={"df_about"}
                title={"Macintosh HD"}
                icon={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/disk.png`}
                appId={appId}
                initialSize={[300, 300]}
                initialPosition={[50, 50]}
                header={<><span>HELLO</span><span>HELLO@</span></>}>
                <PlatinumFileBrowser appId={appId} fs={fs} path={"Macintosh HD"}/>
            </PlatinumWindow>
        </PlatinumApp>
    );
}

export default Finder;
