import {createContext, Suspense, useContext, useReducer} from 'react';
import {loadSoundTheme} from "../PlatinumAppearance"
import {platinumDesktopIconEventHandler} from "./PlatinumDesktopIconContext";
import {PlatinumDesktopSoundManagerProvider} from "./PlatinumDesktopSoundManagerContext";
import {initialDesktopState, PlatinumDesktopState, PlatinumTheme} from "./PlatinumDesktopState";
import {platinumWindowEventHandler} from "./PlatinumDesktopWindowManagerContext"

const PlatinumDesktopContext = createContext(null);
const PlatinumDesktopDispatchContext = createContext(null);

export function PlatinumDesktopProvider({children}) {

    const [desktop, dispatch] = useReducer(platinumDesktopStateEventReducer, initialDesktopState);

    return (
        <Suspense>
            <PlatinumDesktopContext.Provider value={desktop}>
                <PlatinumDesktopDispatchContext.Provider value={dispatch}>
                    <PlatinumDesktopSoundManagerProvider>
                        {children}
                    </PlatinumDesktopSoundManagerProvider>
                </PlatinumDesktopDispatchContext.Provider>
            </PlatinumDesktopContext.Provider>
        </Suspense>
    );
}

export function useDesktop() {
    return useContext(PlatinumDesktopContext);
}

export function useDesktopDispatch() {
    return useContext(PlatinumDesktopDispatchContext);
}

export const platinumDesktopEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type) {
        case "PlatinumDesktopFocus": {
            if ('e' in action && action.e.target.id === "platinumDesktop") {
                ds.activeWindow = "";
                ds.selectedDesktopIcons = [];
                ds.showContextMenu = false;
                ds.selectBox = true;
                ds.selectBoxStart = [action.e.clientX, action.e.clientY];
            }

            if ('menuBar' in action) {
                ds.menuBar = action.menuBar;
            }

            break;
        }
        case "PlatinumDesktopDoubleClick": {
            break;
        }
        case "PlatinumDesktopDrag": {
            ds.selectBoxSize = [action.e.clientX - ds.selectBoxStart[0], action.e.clientY - ds.selectBoxStart[1]];
            break;
        }
        case "PlatinumDesktopStop": {
            ds.selectBox = false;
            ds.selectBoxStart = [0, 0];
            ds.selectBoxSize = [0, 0];
            break;
        }
        case "PlatinumDesktopContextMenu": {
            ds.showContextMenu = action.showContextMenu;
            if (action.contextMenu) {
                ds.contextMenu = action.contextMenu;
            }
            break;
        }
        case "PlatinumDesktopTheme": {
            ds.activeTheme = action.activeTheme;
            let theme: PlatinumTheme = ds.availableThemes.find(x => x.id === ds.activeTheme);
            if ('sound' in theme && 'file' in theme.sound) {
                ds.soundPlayer = loadSoundTheme(process.env.NEXT_PUBLIC_BASE_PATH + theme.sound.file);
            }
            break;
        }
        case "PlatinumDesktopLoadThemes": {
            ds.availableThemes = action.availableThemes;
        }
    }
    return ds;
};


export const platinumAppEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type) {
        case "PlatinumAppOpen": {
            const findIcon = ds.openApps.find((i) =>
                i.id === action.app.id
            );
            if (!findIcon) {
                ds.openApps.push({
                    id: action.app.id,
                    name: action.app.name,
                    icon: action.app.icon,
                    hidden: false
                })
            }
            break;
        }
        case "PlatinumAppClose": {
            ds.openApps = ds.openApps.filter((oa) => oa.id !== action.app.id);
            ds.activeWindow = "";
            break;
        }
        case "PlatinumAppFocus": {
            break;
        }
    }

    return ds;

};

export const platinumDesktopStateEventReducer = (ds: PlatinumDesktopState, action) => {
    const startDs = ds;
    if ('type' in action) {
        if (action.type.startsWith("PlatinumWindow")) {
            ds = platinumWindowEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumApp")) {
            ds = platinumAppEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumDesktopIcon")) {
            ds = platinumDesktopIconEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumDesktop")) {
            ds = platinumDesktopEventHandler(ds, action);
        }
    }
    console.group("Desktop Event");
    console.log("Action: ", action);
    console.log("Start State: ", startDs)
    console.log("End State: ", ds)
    console.groupEnd();
    return {...ds};
};

