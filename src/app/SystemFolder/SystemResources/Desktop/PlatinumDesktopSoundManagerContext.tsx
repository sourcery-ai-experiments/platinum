import {createSoundPlayer, loadSoundTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import {Howl} from 'howler';
import React from 'react';
import soundData from "../../../../../public/sounds/platinum/platinum.json"
import soundLabels from "./PlatinumDesktopSoundManagerLabels.json";

export const PlatinumDesktopSoundManagerContext = React.createContext(null);
export const PlatinumDesktopSoundDispatchContext = React.createContext(null);

export type PlatinumDesktopSoundInfo = {
    id: string;
    group: string;
    label: string;
    description: string;
}

interface PlatinumDesktopSoundState {
    soundPlayer: Howl | null;
    disabled: string[];
    labels: PlatinumDesktopSoundInfo[];
}

enum PlatinumDesktopSoundActionTypes {
    PlatinumSoundStop,
    PlatinumSoundPlay,
    PlatinumSoundPlayInterrupt,
    PlatinumSoundLoad,
    PlatinumSoundSet,
    PlatinumSoundDisable
}

interface PlatinumDesktopSoundAction {
    type: PlatinumDesktopSoundActionTypes;
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: any;
}

export const initialPlayer = {
    soundPlayer: createSoundPlayer(soundData),
    disabled: [],
    labels: soundLabels
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
    const validatedAction = PlatinumDesktopSoundActionTypes[action.type as unknown as keyof typeof PlatinumDesktopSoundActionTypes];
    switch (validatedAction) {
        case PlatinumDesktopSoundActionTypes.PlatinumSoundStop: {
            ss.soundPlayer.stop();
            break;
        }
        case PlatinumDesktopSoundActionTypes.PlatinumSoundPlay: {
            if (playerCanPlay(ss, action.sound)) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumDesktopSoundActionTypes.PlatinumSoundPlayInterrupt: {
            if (playerCanPlayInterrupt(ss, action.sound)) {
                ss.soundPlayer.stop();
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumDesktopSoundActionTypes.PlatinumSoundLoad: {
            ss.soundPlayer = loadSoundTheme(process.env.NEXT_PUBLIC_BASE_PATH + action.file);
            ss.disabled = action.disabled;
            break;
        }
        case PlatinumDesktopSoundActionTypes.PlatinumSoundSet: {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
        case PlatinumDesktopSoundActionTypes.PlatinumSoundDisable: {
            ss.disabled = action.disabled;
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
