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
    type: "PlatinumSoundStop" | "PlatinumSoundPlay" | "PlatinumSoundPlayInterrupt" | "PlatinumSoundLoad" | "PlatinumSoundSet" | "PlatinumSoundDisable";
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: any;
}

export const initialPlayer = {
    soundPlayer: createSoundPlayer(soundData),
    disabled: ["*"]
};

export function useSound() {
    return React.useContext(PlatinumDesktopSoundManagerContext);
}

export function useSoundDispatch() {
    return React.useContext(PlatinumDesktopSoundDispatchContext);
}

const playerCanPlayInterrupt = ({disabled, soundPlayer}: PlatinumDesktopSoundState, sound: string) => {
    return (
        !disabled.includes("*") &&
        !disabled.includes(sound) &&
        soundPlayer
    );
}

const playerCanPlay = (ss: PlatinumDesktopSoundState, sound: string) => {
    return (
        playerCanPlayInterrupt(ss, sound) &&
        !ss.soundPlayer.playing()
    )
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
            if (playerCanPlay(ss, action.sound)) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case "PlatinumSoundPlayInterrupt": {
            if (playerCanPlayInterrupt(ss, action.sound)) {
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
        case "PlatinumSoundDisable": {
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
