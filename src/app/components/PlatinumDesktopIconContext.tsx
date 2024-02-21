import {getTheme} from "./PlatinumAppearance";
import {PlatinumDesktopState, platinumDesktopStateEventReducer,} from "./PlatinumDesktopContext";
import {PlatinumMenuItem} from "./PlatinumMenu";

export type PlatinumDesktopIconState = {
    appId: string;
    appName: string;
    icon: string;
    contextMenu?: PlatinumMenuItem[];
    location?: [number, number];
};

const createGrid = (iconSize: number, iconPadding: number) => {
    return [
        Math.floor(window.innerWidth / (iconSize + iconPadding)),
        Math.floor(window.innerHeight / (iconSize + iconPadding)),
    ];
};

const getGridPosition = (iconSize: number, iconPadding: number, x: number, y: number) => {
    return [
        Math.floor(window.innerHeight - ((iconSize + iconPadding) * y)),
        Math.floor(window.innerWidth - ((iconSize + iconPadding) * x))
    ];
};


const cleanupDesktopIcons = (theme: string, icons: PlatinumDesktopIconState[]) => {
    let newDesktopIcons = [];

    let themeData = getTheme(theme);
    let iconSize = parseInt(themeData.desktop.iconSize, 10);
    let iconPadding = parseInt(themeData.desktop.iconSize, 10) / 4;
    let grid = createGrid(iconSize, iconPadding);

    let sortedIcons = icons.sort(function (a, b) {
        if (a.appName.toLowerCase() > b.appName.toLowerCase()) {
            return 1;
        }
        if (a.appName.toLowerCase() < b.appName.toLowerCase()) {
            return -1;
        }
        return 0;
    });

    let newIcons: PlatinumDesktopIconState[] = [];
    let startX: number = 1;
    let startY: number = 1;

    sortedIcons.forEach((icon) => {
        if (startX >= grid[0]) {
            startX = 1;
            startY = startY + 1;
        }

        if (startY > grid[1]) {
            startY = 1;
        }

        startX = startX + 1;

        newDesktopIcons.push({
            appId: icon.appId,
            appName: icon.appName,
            icon: icon.icon,
            location: [getGridPosition(iconSize, iconPadding, startX, startY)]
        })
    });

    return newDesktopIcons;
}

export const platinumDesktopIconEventHandler = (
    ds: PlatinumDesktopState,
    action,
) => {
    switch (action.type) {
        case "PlatinumDesktopIconCleanup": {
            let newIcons = cleanupDesktopIcons(ds.activeTheme, ds.desktopIcons);
            ds.desktopIcons = newIcons;
            break;
        }
        case "PlatinumDesktopIconFocus": {
            ds.selectedDesktopIcons = [action.iconId];
            break;
        }
        case "PlatinumDesktopIconOpen": {
            ds.selectedDesktopIcons = [action.iconId];
            ds = platinumDesktopStateEventReducer(ds, {
                type: "PlatinumAppOpen",
                app: action.app,
            });
            break;
        }
        case "PlatinumDesktopIconAdd": {
            let icon = ds.desktopIcons.filter((icon) => icon.appId === action.app.id);
            if (icon.length === 0) {

                let newLocation = action.location;
                if (!newLocation) {
                    action.location = [0, 0]
                }
                ds.desktopIcons.push({
                    icon: action.app.icon,
                    appName: action.app.name,
                    appId: action.app.id,
                    location: action.location
                });
            }
            break;
        }
        case "PlatinumDesktopIconRemove": {
            let iconIdx = ds.desktopIcons.findIndex(
                (icon) => icon.appId === action.app.id,
            );
            if (iconIdx > -1) {
                ds.desktopIcons.slice(iconIdx, 1);
            }
            break;
        }
        case "PlatinumDesktopIconMove": {
            let iconIdx = ds.desktopIcons.findIndex(
                (icon) => icon.appId === action.app.id,
            );
            if (iconIdx > -1) {
                console.log("MOVING");
                ds.desktopIcons[iconIdx].location = action.location;
            }
            break;
        }
    }
    return ds;
};
