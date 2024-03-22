import {FileSystemEntry, PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/FileSystem";
import PlatinumIcon from "@/app/SystemFolder/SystemResources/Icon/PlatinumIcon";
import {createColumnHelper, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import React from "react";

type PlatinumFileBrowserProps = {
    fs: PlatinumFileSystem;
    display: "icons" | "list";
    path: string;
    appId: string;
    dirOnClickFunc?: any;
    fileOnClickFunc?: any;
}

const PlatinumFileBrowser: React.FC<PlatinumFileBrowserProps> = ({
                                                                     fs,
                                                                     display = "list",
                                                                     path,
                                                                     appId,
                                                                     dirOnClickFunc = () => {
                                                                     },
                                                                     fileOnClickFunc = () => {
                                                                     },
                                                                 }) => {

    const [fileBrowserState, setFileBrowserState] = React.useState<object>({});
    let directoryListing = fs.filterByType(path, ["file", "directory"]);

    console.log("DIRECTORY LISTING");
    console.log(fs.filterByType(fs.resolve(path), "file"));

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

    const openFileOrFolder = (properties, path, filename) => {
        switch (properties["_type"]) {
            case "directory": {
                return () => dirOnClickFunc(path + ":" + filename)
            }
            case "file": {
                return () => fileOnClickFunc(path + ":" + filename)
            }
            default: {
                return () => {
                }
            }
        }
    }

    let items: React.ReactNode

    switch (display) {
        case "list": {
            let listItems = [];
            const columnHelper = createColumnHelper<FileSystemEntry>()

            const columns = [
                columnHelper.accessor('name', {
                    cell: info => info.getValue(),
                    footer: info => info.column.id,
                }),
                columnHelper.accessor(row => row.lastName, {
                    id: 'fullPath',
                    cell: info => <i>{info.getValue()}</i>,
                    header: () => <span>Last Name</span>,
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('age', {
                    header: () => 'Age',
                    cell: info => info.renderValue(),
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('visits', {
                    header: () => <span>Visits</span>,
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('status', {
                    header: 'Status',
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('progress', {
                    header: 'Profile Progress',
                    footer: info => info.column.id,
                }),
            ]
            const dirrr = fs.ls()

            const table = useReactTable({
                directoryListing,
                columns,
                getCoreRowModel: getCoreRowModel(),
            })

            directoryListing.forEach(([filename, properties]) => {
                listItems.push(
                    <p onClick={openFileOrFolder(properties, path, filename)}>{filename}</p>
                )
            })

            items = (<>{listItems}</>);
            break;

        }
        case "icons": {
            let icons = [];
            directoryListing.forEach(([filename, properties]) => {
                icons.push(
                    <PlatinumIcon
                        appId={appId}
                        name={filename}
                        icon={properties["_icon"] || iconImageByType(properties["_type"])}
                        initialPosition={[0, 0]}
                        onClickFunc={openFileOrFolder(properties, path, filename)}
                    />
                )
            })
            items = <>{icons}</>
            break;
        }
    }


    return (
        <div>
            {items}
        </div>
    );
};

export default PlatinumFileBrowser;

