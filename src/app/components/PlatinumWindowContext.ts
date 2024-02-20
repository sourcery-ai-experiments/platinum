import {PlatinumMenuItem} from "./PlatinumMenu";

export type PlatinumWindowState = {
    size: [number, number],
    position: [number, number],
    clickPosition?: [number, number];
    closed?: boolean,
    menuBar?: PlatinumMenuItem[];
    collapsed?: boolean;
    zoomed?: boolean;
    dragging?: boolean;
    resizing?: boolean;
    sounding?: boolean;
    moving?: boolean;
    contextMenu?: [];
    contextMenuShown: boolean;
    contextMenuLocation?: [number, number];
}

export const PlatinumWindowStateEventReducer = (ws: PlatinumWindowState, action) => {
    if (action.type.startsWith("PlatinumWindow")) {
        switch (action.type.replace("PlatinumWindow", "").toLowerCase()) {
            case "open": {
                ws.closed = false;
                break;
            }
            case "close": {
                ws.closed = true;
                break;
            }
            case "resize": {
                ws.resizing = action.resizing;
                break;
            }
            case "zoom": {
                ws.zoomed = action.zoomed;
                break;
            }
            case "focus": {
                break;
            }
            case "expand": {
                ws.collapsed = false;
                break;
            }
            case "collapse": {
                ws.collapsed = true;
                break;
            }
            case "drag": {
                ws.dragging = action.dragging;
                break;
            }
            case "contextmenu": {
                ws.contextMenu = action.contextMenu;
                if (action.contextMenuShown === true) {
                    ws.contextMenuLocation = action.position;
                }
                break;
            }
            case "move": {
                ws.moving = action.moving;
                if (action.moving === true) {
                    ws.position = action.position;
                }
                break;
            }
        }
    }
    return {...ws};
};

