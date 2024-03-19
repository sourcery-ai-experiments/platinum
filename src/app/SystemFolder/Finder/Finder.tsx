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
                "_type": "directory",
                "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/directory.png`,
            },
            "test2": {
                "_type": "directory",
                "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/directory.png`,
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
    const [openPaths, setOpenPaths] = React.useState(["Macintosh HD"]);

    const addPath = (path: string) => {
        var uniqueOpenPaths = new Set([...openPaths, path]);
        setOpenPaths(Array.from(uniqueOpenPaths))
        console.log(uniqueOpenPaths);
    }

    const removePath = (path: string) => {
        console.log("REMOVING" + path);
        let updatedPath = path.replace('Finder:', '');
        var uniqueOpenPaths = openPaths.filter(e => e !== updatedPath);
        setOpenPaths(uniqueOpenPaths);
    }

    const fs = new PlatinumFileSystem("", defaultFSContent);
    const desktopEventDispatch = useDesktopDispatch();

    React.useEffect(() => {
        const drives = fs.filterByType("", "drive");
        drives.forEach(([a, b]) => {
            desktopEventDispatch({
                type: "PlatinumDesktopIconAdd",
                app: {
                    id: appId,
                    name: a,
                    icon: b['_icon']
                }
            });
        });
    }, []);

    let openWindows = [];
    openPaths.forEach((op, idx) => {
        let dir = fs.statDir(op);
        openWindows.push(
            <PlatinumWindow
                id={appName + ":" + op}
                title={dir['_name']}
                icon={`${process.env.NEXT_PUBLIC_BASE_PATH}${dir['_icon']}`}
                appId={appId}
                initialSize={[300, 300]}
                initialPosition={[50 + (idx * 50), 50 + (idx * 50)]}
                header={<span>{dir["_count"]} items</span>}
                onCloseFunc={removePath}
            >
                <PlatinumFileBrowser appId={appId} fs={fs} path={op} dirOnClickFunc={addPath}/>
            </PlatinumWindow>
        )
    })

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
            defaultWindow={""}>
            {openWindows}
        </PlatinumApp>
    );
}

export default Finder;
