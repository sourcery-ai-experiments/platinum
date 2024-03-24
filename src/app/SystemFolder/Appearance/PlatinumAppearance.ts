import themesData from "@/app/SystemFolder/Appearance/styles/themes.json";

const makeThemeStyle = (theme = themesData[0]) => {

    return {
        "--color-black": theme.color.black,
        "--color-white": theme.color.white,
        "--color-alert": theme.color.alert,
        "--color-error": theme.color.error,
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
        "--desktop-background-image": `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}${theme.desktop.backgroundImage})`,
        "--desktop-background-color": theme.desktop.backgroundColor,
        "--desktop-background-repeat": theme.desktop.repeat,
        "--desktop-background-position": theme.desktop.position,
        "--desktop-background-size": theme.desktop.size
    }
}

export const getThemeVars = (theme: string) => {
    for (let i = 0; i < themesData.length; i++) {
        if (themesData[i].id === theme) {
            return makeThemeStyle(themesData[i]);
        }
    }
    return makeThemeStyle(themesData[0]);
}

export const getAllThemes = () => {
    return themesData;
}

export const getTheme = (theme: string, overrides?: {}) => {
    let namedThemeData: object = themesData[0];
    for (let i = 0; i < themesData.length; i++) {
        if (themesData[i].id === theme) {
            namedThemeData = themesData[i];
        }
    }

    return overrides ? mergeDeep(namedThemeData, overrides) : namedThemeData;
};


export const mergeDeep = (target: object, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    const isObject = (item) => {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, {[key]: {}});
            mergeDeep(target[key], source[key]);
        } else {
            Object.assign(target, {[key]: source[key]});
        }
    }

    return mergeDeep(target, ...sources);
}
