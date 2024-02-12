import classNames from "classnames";
import * as React from "react";
import {Suspense} from "react";
import PlatinumContextMenu from "./PlatinumContextMenu";
import platinumDesktop from "./PlatinumDesktop.module.scss";
import {useDesktop, useDesktopDispatch} from "./PlatinumDesktopContext";
import PlatinumDesktopMenu from "./PlatinumDesktopMenu";

import themesData from "./styles/themes.json"

interface PlatinumDesktopProps {
    children?: any;
}

const PlatinumDesktop: React.FC<PlatinumDesktopProps> = ({children}) => {

    const [contextMenu, setContextMenu] = React.useState(false);
    const [contextMenuLocation, setContextMenuLocation] = React.useState([0, 0]);

    const [selectBoxStart, setSelectBoxStart] = React.useState([0, 0]);
    const [selectBoxSize, setSelectBoxSize] = React.useState([0, 0]);
    const [selectBox, setSelectBox] = React.useState(false);


    const clickOffset = [10, 10];

    const desktopState = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    // React.useEffect(() => {
    //     if (soundTheme !== "" && desktopState.soundTheme.sprites.length <= 0) {
    //         desktopEventDispatch({
    //             type: "PlatinumDesktopSoundTheme",
    //             soundThemeURL: soundTheme,
    //         });
    //     }
    // }, [desktopState, desktopEventDispatch])


    const isObject = (item) => {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }

    const mergeDeep = (target, ...sources) => {
      if (!sources.length) return target;
      const source = sources.shift();

      if (isObject(target) && isObject(source)) {
        for (const key in source) {
          if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }

      return mergeDeep(target, ...sources);
    }

    const makeThemeStyle = (theme = themesData[0]) => {

        return {
            "--color-black": theme.color.black,
            "--color-white": theme.color.white,
            "--color-system-01": theme.color.system[0],
            "--color-system-02": theme.color.system[1],
            "--color-system-03": theme.color.system[2],
            "--color-system-04": theme.color.system[3],
            "--color-system-05": theme.color.system[4],
            "--color-system-06": theme.color.system[5],
            "--color-system-07": theme.color.system[6],
            "--color-theme-01": theme.color.theme[0],
            "--color-theme-02": theme.color.theme[1],
            "--color-theme-03": theme.color.theme[2],
            "--color-theme-04": theme.color.theme[3],
            "--color-theme-05": theme.color.theme[4],
            "--color-theme-06": theme.color.theme[5],
            "--color-theme-07": theme.color.theme[6],
            "--window-control-size": theme.measurements.window.controlSize,
            "--window-border-size": theme.measurements.window.borderSize,
            "--window-padding-size": theme.measurements.window.paddingSize,
            "--window-scrollbar-size": theme.measurements.window.scrollbarSize,
            "--desktop-icon-size": theme.desktop.iconSize,
            "--desktop-icon-font-size": theme.desktop.iconFontSize,
            "--header-font": theme.typography.header,
            "--header-font-size": theme.typography.headerSize,
            "--body-font": theme.typography.body,
            "--body-font-size": theme.typography.bodySize,
            "--ui-font": theme.typography.ui,
            "--ui-font-size": theme.typography.uiSize,
            "--color-window-border": theme.color.window.border,
            "--color-window-border-outset": theme.color.window.borderOutset,
            "--color-window-border-inset": theme.color.window.borderInset,
            "--color-window-frame": theme.color.window.frame,
            "--color-window-title": theme.color.window.title,
            "--color-window-document": theme.color.window.document,
            "--color-outline": theme.color.outline,
            "--color-select": theme.color.select,
            "--color-highlight": theme.color.highlight,
            "--desktop-background-image": theme.desktop.backgroundImage,
            "--desktop-background-color": theme.desktop.backgroundColor,
            "--desktop-background-repeat": theme.desktop.repeat,
            "--desktop-background-position": theme.desktop.position,
            "--desktop-background-size": theme.desktop.size
        }
    }

    const getTheme = (color: string) => {
        for (let i = 0; i < themesData.length; i++) {
            if (themesData[i].id === color) {
                return makeThemeStyle(themesData[i]);
            }
        }
        return makeThemeStyle(themesData[0]);
    }

    const startSelectBox = (e) => {
        if (e.target.id === "platinumDesktop") {
            if (e.button > 1) {
                toggleDesktopContextMenu(e);
            } else {
                clearActives(e);
                setSelectBox(true);
                setSelectBoxStart([e.clientX, e.clientY]);
                setSelectBoxSize([0, 0]);
            }
        }
    }

    const resizeSelectBox = (e) => {
        setSelectBoxSize([e.clientX - selectBoxStart[0], e.clientY - selectBoxStart[1]]);
    }

    const clearSelectBox = (e) => {
        setSelectBoxSize([0, 0]);
        setSelectBoxStart([0, 0]);
        setSelectBox(false);
    }

    const clearActives = (e) => {
        setContextMenu(false);
        desktopEventDispatch({
            type: "PlatinumDesktopFocus",
            e: e,
        });
    }

    const toggleDesktopContextMenu = (e) => {
        if (e.target.id === "platinumDesktop") {
            e.preventDefault();
            setContextMenuLocation([e.clientX - clickOffset[0], e.clientY - clickOffset[1]]);
            setContextMenu(!contextMenu);
        }
    }

    const testMenuItems = [];

    const currentTheme = getTheme(desktopState.activeTheme);

    return (
        <>
            <Suspense>
                <div id={"platinumDesktop"}
                     style={{...currentTheme}}
                     className={classNames(platinumDesktop.platinumDesktop)}
                     onMouseMove={resizeSelectBox}
                     onContextMenu={toggleDesktopContextMenu}
                     onClick={clearSelectBox}
                     onMouseDown={startSelectBox}>
                    {selectBox &&
                        <div className={platinumDesktop.platinumDesktopSelect}
                             style={{
                                 left: selectBoxStart[0],
                                 top: selectBoxStart[1],
                                 width: selectBoxSize[0],
                                 height: selectBoxSize[1]
                             }}/>
                    }
                    <PlatinumDesktopMenu menuItems={desktopState.menuBar}/>
                    {contextMenu && (
                        <PlatinumContextMenu menuItems={testMenuItems}
                                             position={contextMenuLocation}/>
                    )}
                    {children}
                </div>
            </Suspense>
        </>
    );
};

export default PlatinumDesktop;
