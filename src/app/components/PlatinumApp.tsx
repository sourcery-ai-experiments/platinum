'use client';
import * as React from "react";
import {JSONTree} from 'react-json-tree';
import PlatinumAppContext from "./PlatinumAppContext";
import {getTheme} from "./PlatinumAppearance";
import {useDesktop, useDesktopDispatch} from './PlatinumDesktopContext';
import {useSound} from "./PlatinumDesktopSoundContext";
import PlatinumWindow from "./PlatinumWindow";

interface PlatinumAppProps {
    id: string;
    name: string;
    icon: string;
    hidden: boolean;
    desktop?: boolean;
    debug?: boolean;
    open?: boolean;
    children?: any;
}


const PlatinumApp: React.FC<PlatinumAppProps> = (
    {id, icon, name, open = false, hidden = false, debug = false, children}
) => {
    const {appContext, setAppContext} = React.useContext(PlatinumAppContext);
    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const themeData = getTheme(desktopContext.activeTheme);
    const debuggerJSONTheme = {
        base00: themeData.color.white,
        base01: themeData.color.black,
        base02: themeData.color.system[1],
        base03: themeData.color.system[3],
        base04: themeData.color.system[4],
        base05: themeData.color.system[5],
        base06: themeData.color.system[6],
        base07: themeData.color.black,
        base08: themeData.color.error,
        base09: themeData.color.theme[2],
        base0A: themeData.color.theme[2],
        base0B: themeData.color.theme[3],
        base0C: themeData.color.theme[3],
        base0D: themeData.color.theme[5],
        base0E: themeData.color.theme[5],
        base0F: themeData.color.theme[6],
    };

    return (
        <>
            {debug &&
                <PlatinumWindow initialSize={[400, 300]}
                                initialPosition={[100, 200]}
                                title={"DEBUG " + name}
                                id={id + "_debugger"}
                                appId={id}
                                appMenu={[{id: "Debug", title: "Debug"}]}
                >
                    <h1>Providers</h1>
                    <hr/>
                    <h2>appContext</h2>
                    <JSONTree data={appContext} theme={debuggerJSONTheme}/>
                    <br/>
                    <h2>desktopContext</h2>
                    <JSONTree data={desktopContext} theme={debuggerJSONTheme}/>
                    <br/>
                    <h2>soundPlayer</h2>
                    <JSONTree data={useSound()} theme={debuggerJSONTheme}/>
                </PlatinumWindow>
            }
            {!hidden &&
                <>
                    {children}
                </>
            }
        </>
    );
};

export default PlatinumApp;
