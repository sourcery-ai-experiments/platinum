import {PlatinumDesktopState} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopState";

export const platinumWindowEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type) {
        case "PlatinumWindowOpen": {
            ds.activeWindow = action.app.id;
            break;
        }
        case "PlatinumWindowClose": {
            break;
        }
        case "PlatinumWindowFocus": {
            ds.activeWindow = action.app.id;
            ds.menuBar = action.app.appMenu;
            break;
        }
        case "PlatinumWindowMenu": {
            ds.menuBar = action.menuBar;
        }
    }
    return ds;
};
