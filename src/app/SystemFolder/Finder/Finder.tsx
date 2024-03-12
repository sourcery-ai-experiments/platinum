import PlatinumApp from "@/app/SystemFolder/SystemResources/App/PlatinumApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/PlatinumAppManagerContext";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

class FileSystem {
    basePath: string;
    fs: object;
    separator: string;

    constructor(basePath: string, defaultFS: any, separator = ":") {
        this.basePath = basePath
        this.fs = typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem(this.basePath)) || defaultFS
            : defaultFS;
        this.separator = separator;
    }

    size(str) {
        return new Blob([str]).size;
    }

    pathArray(path: string) {
        return [this.basePath, ...path.split(this.separator)].filter((v) => v !== "");
    }

    resolve(path: string) {
        return this.pathArray(path).reduce((prev, curr) => prev?.[curr], this.fs)
    }

    readFile(path: string) {
        let item = this.resolve(path);
        if ('_data' in item && '_mimeType' in item) {
            return this.renderFile(item['_mimeType'], item['_data']);
        }
    }

    renderFile(mimeType: string, contents: any) {
        switch (mimeType) {
            default: {
                return contents;
            }
        }
    }

    ls(path: string) {
        let current = this.resolve(path);
        return Object.entries(current);
    }

    removeMetadata(content: any) {
        return Object.entries(content).filter(([a, b]) => {
            if (a.startsWith("_")) return a
        });
    }

    filterByType(path: string, byType: string = "file") {
        return this.ls(path).filter(([_, b]) => b['_type'] === byType);
    }

    statDir(path: string) {
        let current = this.resolve(path);
        return this.removeMetadata(current);
    }
}

const Finder = () => {

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`;
    let defaultFSContent = {
        "Macintosh HD": {
            "_type": "drive",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/disk/default.png`,
            "test3.txt": {
                "_type": "file",
                "_mimeType": "",
                "_data": "File Contents"
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
    let fs = new FileSystem("", defaultFSContent);
    // console.log(fs.statDir(""));
    // console.log(fs.ls(""));
    console.log(fs.filterByType("Macintosh HD", "directory"))
    const desktopEventDispatch = useDesktopDispatch();

    const desktopIcon = {
        id: "MacintoshHD",
        name: "MacintoshHD",
        icon: appIcon
    }

    React.useEffect(() => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconAdd",
            app: {
                id: desktopIcon.id,
                name: desktopIcon.name,
                icon: desktopIcon.icon
            }
        });
    }, []);

    return (
        <PlatinumApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
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
                {/*{getRootDirectory().map((i, idx) => (*/}
                {/*    <PlatinumIcon appId={appId} name={i}*/}
                {/*                  initialPosition={[(idx * 32), (idx * 32)]}*/}
                {/*                  key={"dir_" + i}*/}
                {/*                  icon={"/img/icons/folders/default.png"}></PlatinumIcon>*/}
                {/*))}*/}
            </PlatinumWindow>
        </PlatinumApp>
    );
}

export default Finder;
