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

    const [openPaths, setOpenPaths] = React.useState(["Macintosh HD"]);

    const openFolder = (path: string) => {
        setOpenPaths(Array.from(new Set([...openPaths, path])))
    }

    const openFile = (path: string) => {
        console.log('simulating opening of ' + path)
    }
    const closeFolder = (path: string) => {
        const uniqueOpenPaths = openPaths.filter(e => e !== path.replace('Finder:', ''));
        setOpenPaths(uniqueOpenPaths);
    }

    const closeAll = () => {
        setOpenPaths([]);
    }

    const emptyTrash = () => {
        desktopEventDispatch({
            type: "PlatinumFinderEmptyTrash",
        });
    }

    const fs = new PlatinumFileSystem("");
    const desktopEventDispatch = useDesktopDispatch();

    React.useEffect(() => {
        const drives = fs.filterByType("", "drive");
        console.log(drives)
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
        desktopEventDispatch({
            type: "PlatinumDesktopIconAdd",
            app: {
                id: "finder_trash",
                name: "Trash",
                icon: "trash",
            },
            onClickFunc: closeAll
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
                onCloseFunc={closeFolder}
            >
                <PlatinumFileBrowser appId={appId} fs={fs} path={op} dirOnClickFunc={openFolder}
                                     fileOnClickFunc={openFile}/>
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
