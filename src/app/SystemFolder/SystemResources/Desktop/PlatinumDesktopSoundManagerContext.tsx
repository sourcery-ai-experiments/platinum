import {createSoundPlayer, loadSoundTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import {Howl} from 'howler';
import React from 'react';
import soundData from "../../../../../public/sounds/platinum/platinum.json"


export const PlatinumDesktopSoundManagerContext = React.createContext(null);
export const PlatinumDesktopSoundDispatchContext = React.createContext(null);


interface PlatinumDesktopSoundState {
    soundPlayer: Howl | null;
    disabled: string[];
}

interface PlatinumDesktopSoundAction {
    type: "PlatinumSoundStop" | "PlatinumSoundPlay" | "PlatinumSoundPlayInterrupt" | "PlatinumSoundLoad" | "PlatinumSoundSet";
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: any;
}

export const initialPlayer = {
    soundPlayer: createSoundPlayer(soundData),
    disabled: []
};

export function useSound() {
    return React.useContext(PlatinumDesktopSoundManagerContext);
}

export function useSoundDispatch() {
    return React.useContext(PlatinumDesktopSoundDispatchContext);
}

export const PlatinumDesktopSoundStateEventReducer = (
    ss: PlatinumDesktopSoundState,
    action: PlatinumDesktopSoundAction
) => {
    switch (action.type) {
        case "PlatinumSoundStop": {
            ss.soundPlayer.stop();
            break;
        }
        case "PlatinumSoundPlay": {
            if (!ss.disabled.includes("*") && !ss.disabled.includes(action.sound) && ss.soundPlayer && !ss.soundPlayer.playing()) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case "PlatinumSoundPlayInterrupt": {
            if (!ss.disabled.includes("*") && !ss.disabled.includes(action.sound) && ss.soundPlayer) {
                ss.soundPlayer.stop();
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case "PlatinumSoundLoad": {
            ss.soundPlayer = loadSoundTheme(process.env.NEXT_PUBLIC_BASE_PATH + action.file);
            ss.disabled = action.disabled;
            break;
        }
        case "PlatinumSoundSet": {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
    }
    return ss;
};


export function PlatinumDesktopSoundManagerProvider({children}) {
    const [sound, soundDispatch] = React.useReducer(PlatinumDesktopSoundStateEventReducer, initialPlayer);

    return (
        <PlatinumDesktopSoundManagerContext.Provider value={sound}>
            <PlatinumDesktopSoundDispatchContext.Provider value={soundDispatch}>
                {children}
            </PlatinumDesktopSoundDispatchContext.Provider>
        </PlatinumDesktopSoundManagerContext.Provider>
    );
}
