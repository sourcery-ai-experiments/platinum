import {FileSystemEntry, PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/FileSystem";
import PlatinumIcon from "@/app/SystemFolder/SystemResources/Icon/PlatinumIcon";
import {createColumnHelper, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import React from "react";

type PlatinumFileBrowserProps = {
    fs: PlatinumFileSystem;
    path: string;
    appId: string;
    display?: "icons" | "list";
    dirOnClickFunc?: any;
    fileOnClickFunc?: any;
}

const PlatinumFileBrowser: React.FC<PlatinumFileBrowserProps> = (
    {
        fs,
        display = "icons",
        path,
        appId,
        dirOnClickFunc = () => {
        },
        fileOnClickFunc = () => {
        },
    }
) => {

    let directoryListing = fs.filterByType(path, ["file", "directory"]);

    const iconImageByType = (byType: string) => {
        switch (byType) {
            case "directory": {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/folders/directory.png`
            }
            default: {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/files/file.png`
            }
        }
    };

    const openFileOrFolder = (properties, path: string, filename: string) => {
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
        // TODO: Still need to work on this... I left it in a weird place.
        // case "list": {
        //     let listItems = [];
        //     const columnHelper = createColumnHelper<FileSystemEntry>()
        //
        //     const columns = [
        //         columnHelper.accessor('name', {
        //             cell: info => info.getValue(),
        //             footer: info => info.column.id,
        //         }),
        //         columnHelper.accessor(row => row.lastName, {
        //             id: 'fullPath',
        //             cell: info => <i>{info.getValue()}</i>,
        //             header: () => <span>Last Name</span>,
        //             footer: info => info.column.id,
        //         }),
        //         columnHelper.accessor('age', {
        //             header: () => 'Age',
        //             cell: info => info.renderValue(),
        //             footer: info => info.column.id,
        //         }),
        //         columnHelper.accessor('visits', {
        //             header: () => <span>Visits</span>,
        //             footer: info => info.column.id,
        //         }),
        //         columnHelper.accessor('status', {
        //             header: 'Status',
        //             footer: info => info.column.id,
        //         }),
        //         columnHelper.accessor('progress', {
        //             header: 'Profile Progress',
        //             footer: info => info.column.id,
        //         }),
        //     ]
        //     const dirrr = fs.ls()
        //
        //     const table = useReactTable({
        //         directoryListing,
        //         columns,
        //         getCoreRowModel: getCoreRowModel(),
        //     })
        //
        //     directoryListing.forEach(([filename, properties]) => {
        //         listItems.push(
        //             <p onClick={openFileOrFolder(properties, path, filename)}>{filename}</p>
        //         )
        //     })
        //
        //     items = (<>{listItems}</>);
        //     break;
        //
        // }
        case "icons": {
            // TODO: Icons are moving relative to the entire screen and not the bounding box. Need to fix that.
            let icons = [];
            directoryListing.forEach(([filename, properties]) => {
                icons.push(
                    <PlatinumIcon
                        appId={appId}
                        name={filename}
                        icon={properties["_icon"] || iconImageByType(properties["_type"])}
                        onClickFunc={openFileOrFolder(properties, path, filename)}
                    />
                )
            })
            items = <>{icons}</>
            break;
        }
    }


    return (
        <div style={{position: "absolute"}}>
            {items}
        </div>
    );
};

export default PlatinumFileBrowser;

