import {PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/FileSystem";
import PlatinumIcon from "@/app/SystemFolder/SystemResources/Icon/PlatinumIcon";
import React from "react";

type PlatinumFileBrowserProps = {
    fs: PlatinumFileSystem;
    path: string;
    appId: string;
    dirOnClickFunc: any;
}

const PlatinumFileBrowser: React.FC<PlatinumFileBrowserProps> = ({fs, path, appId, dirOnClickFunc}) => {

    const [fileBrowserState, setFileBrowserState] = React.useState<object>({});
    let directoryListing = fs.filterByType(path, ["file", "directory"]);
    let icons = []

    const iconImageByType = (byType: string) => {
        switch (byType) {
            case "directory": {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/directory.png`
            }
            default: {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/file.png`
            }
        }
    };

    directoryListing.forEach(([filename, properties]) => {
        icons.push(
            <PlatinumIcon
                appId={appId}
                name={filename}
                icon={properties["_icon"] || iconImageByType(properties["_type"])}
                initialPosition={[0, 0]}
                onClickFunc={properties["_type"] === "directory" ? () => dirOnClickFunc(path + ":" + filename) : () => {
                }}
            />
        )
    })

    return (
        <div>
            {icons}
        </div>
    );
};

export default PlatinumFileBrowser;

