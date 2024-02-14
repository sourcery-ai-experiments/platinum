import {Howl} from 'howler';
import React, {createContext, useContext} from 'react';
import {loadSoundTheme} from "./PlatinumAppearance"
import {PlatinumMenuItem} from "./PlatinumMenu";

const PlatinumDesktopContext = createContext(null);
const PlatinumDesktopDispatchContext = createContext(null);


interface PlatinumDesktopState {
    activeTheme: string;
    soundPlayer: Howl;
    availableThemes: PlatinumTheme[];
    selectedDesktopIcons: string[];
    activeWindow: string;
    activeApp: string;
    menuBar: PlatinumMenuItem[];
    systemMenu: PlatinumMenuItem[];
    openApps: PlatinumMenuItem[];
    contextMenu: PlatinumMenuItem[];
    showContextMenu: boolean;
    selectBox: boolean;
    selectBoxSize: number[];
    selectBoxStart: number[];
}


type PlatinumThemeColorPalette = [number, number, number, number, number, number, number];

type PlatinumThemeColorsWindow = {
    border: string;
    borderOutset: string;
    borderInset: string;
    frame: string;
    title: string;
    document: string;
}

type PlatinumThemeColors = {
    outline: string;
    select: string;
    highlight: string;
    black: string;
    white: string;
    alert: string;
    error: string;
    system: PlatinumThemeColorPalette;
    theme: PlatinumThemeColorPalette;
    window: PlatinumThemeColorsWindow;
}

type PlatinumThemeTypography = {
    ui: string;
    uiSize: string;
    header: string;
    headerSize: string;
    body: string;
    bodySize: string;
}

type PlatinumThemeMeasurementsWindow = {
    borderSize: string;
    controlSize: string;
    paddingSize: string
    scrollbarSize: string;
}

type PlatinumThemeMeasurements = {
    window: PlatinumThemeMeasurementsWindow;
}

type PlatinumThemeSound = {
    file: string;
    disabled: string[];
}

type PlatinumThemeDesktop = {
    iconSize: string;
    iconFontSize: string;
    backgroundImage: string;
    backgroundColor: string;
    repeat: string;
    position: string;
    size: string;
}

type PlatinumTheme = {
    id: string;
    name: string;
    color: PlatinumThemeColors
    typography: PlatinumThemeTypography;
    measurements: PlatinumThemeMeasurements;
    desktop: PlatinumThemeDesktop;
    sound: PlatinumThemeSound;
};


const initialDesktop = {
    activeTheme: "default",
    availableThemes: [],
    selectedDesktopIcons: [],
    soundPlayer: null,
    activeWindow: "",
    menuBar: [],
    systemMenu: [{
        id: "about",
        title: "About This Computer",
        keyboardShortcut: "&#8984;S"
    },
        {id: "spacer"},
    ],
    activeApp: "finder.app",
    openApps: [
        {
            id: "finder.app",
            name: "Finder",
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/macos.svg`

        }
    ],
    contextMenu: [],
    showContextMenu: false,
    selectBox: false,
    selectBoxSize: [0, 0],
    selectBoxStart: [0, 0]
};

export function PlatinumDesktopProvider({children}) {

    const [desktop, dispatch] = React.useReducer(platinumDesktopStateEventReducer, initialDesktop);

    return (
        <PlatinumDesktopContext.Provider value={desktop}>
            <PlatinumDesktopDispatchContext.Provider value={dispatch}>
                {children}
            </PlatinumDesktopDispatchContext.Provider>
        </PlatinumDesktopContext.Provider>
    );
}

export function useDesktop() {
    return useContext(PlatinumDesktopContext);
}

export function useDesktopDispatch() {
    return useContext(PlatinumDesktopDispatchContext);
}

export const platinumDesktopEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type.replace("PlatinumDesktop", "").toLowerCase()) {
        case "focus": {
            if (action.e.target.id === "platinumDesktop") {
                ds.activeWindow = "";
                ds.selectedDesktopIcons = [];
                ds.showContextMenu = false;
                ds.selectBox = true;
                ds.selectBoxStart = [action.e.clientX, action.e.clientY]
            }
            break;
        }
        case "doubleclick": {
            break;
        }
        case "drag": {
            ds.selectBoxSize = [action.e.clientX - ds.selectBoxStart[0], action.e.clientY - ds.selectBoxStart[1]];
            break;
        }
        case "stop": {
            ds.selectBox = false;
            ds.selectBoxStart = [0, 0];
            ds.selectBoxSize = [0, 0];
            break;
        }
        case "contextmenu": {
            ds.showContextMenu = action.showContextMenu;
            if (action.contextMenu) {
                ds.contextMenu = action.contextMenu;
            }
            break;
        }
        case "theme": {
            ds.activeTheme = action.activeTheme;
            let theme = ds.availableThemes.find(x => x.id === ds.activeTheme);
            if (theme) {
                ds.soundPlayer = loadSoundTheme(theme.sound.file);
            }
            break;
        }
        case "loadthemes": {
            ds.availableThemes = action.availableThemes;
        }
    }
    return ds;
};


export const platinumWindowEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type.replace("PlatinumWindow", "").toLowerCase()) {
        case "open": {
            ds.activeWindow = action.app.id;
            break;
        }
        case "close": {
            break;
        }
        case "focus": {
            ds.activeWindow = action.app.id;
            break;
        }
        case "menu": {
            ds.menuBar = action.menuBar;
        }
    }
    return ds;
};

export const platinumDesktopIconEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type.replace("PlatinumDesktopIcon", "").toLowerCase()) {
        case "focus": {
            ds.selectedDesktopIcons = [action.iconId];
            break;
        }
        case "open": {
            ds.selectedDesktopIcons = [action.iconId];
            ds = platinumAppEventHandler(ds, {
                type: "PlatinumAppOpen",
                app: action.app,
            })
            break;
        }
    }
    return ds;
};

export const platinumAppEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type.replace("PlatinumApp", "").toLowerCase()) {
        case "open": {
            if (ds.openApps.length > 0) {
                const idx = ds.openApps.findIndex(o => o.id === action.appId);
                if (idx > -1) {
                    ds.openApps.push({...action.app});
                    ds.activeWindow = action.app.id;
                } else {
                    ds.openApps.push(action.app);
                }
            } else {
                ds.openApps.push(action.app);
            }
            break;
        }
        case "close": {
            if (ds.openApps.length > 0) {
                const idx = ds.openApps.findIndex(o => o.id === action.appId);
                if (idx > -1) {
                    ds.openApps.splice(idx, 1);
                    ds.activeWindow = "";
                }
            }
            break;
        }
        case "focus": {
            break;
        }
    }

    return ds;

};

export const platinumDesktopStateEventReducer = (ds: PlatinumDesktopState, action) => {
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
    return {...ds};
};

