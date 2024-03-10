import {createSoundPlayer, loadSoundTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import {Howl} from 'howler';
import React from 'react';
import soundData from "../../../../../public/sounds/platinum/platinum.json"
import soundLabels from "./PlatinumSoundManagerLabels.json";

export const PlatinumSoundManagerContext = React.createContext(null);
export const PlatinumSoundDispatchContext = React.createContext(null);

export type PlatinumSoundInfo = {
    id: string;
    group: string;
    label: string;
    description: string;
}

interface PlatinumSoundState {
    soundPlayer: Howl | null;
    disabled: string[];
    labels: PlatinumSoundInfo[];
}

enum PlatinumSoundActionTypes {
    PlatinumSoundStop,
    PlatinumSoundPlay,
    PlatinumSoundPlayInterrupt,
    PlatinumSoundLoad,
    PlatinumSoundSet,
    PlatinumSoundDisable
}

interface PlatinumSoundAction {
    type: PlatinumSoundActionTypes;
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
    return React.useContext(PlatinumSoundManagerContext);
}

export function useSoundDispatch() {
    return React.useContext(PlatinumSoundDispatchContext);
}

const playerCanPlayInterrupt = ({disabled, soundPlayer}: PlatinumSoundState, sound: string) => {
    return (
        !disabled.includes("*") &&
        !disabled.includes(sound) &&
        soundPlayer
    );
}

const playerCanPlay = (ss: PlatinumSoundState, sound: string) => {
    return (
        playerCanPlayInterrupt(ss, sound) &&
        !ss.soundPlayer.playing()
    )
}

export const PlatinumSoundStateEventReducer = (
    ss: PlatinumSoundState,
    action: PlatinumSoundAction
) => {
    const validatedAction = PlatinumSoundActionTypes[action.type as unknown as keyof typeof PlatinumSoundActionTypes];
    switch (validatedAction) {
        case PlatinumSoundActionTypes.PlatinumSoundStop: {
            ss.soundPlayer.stop();
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundPlay: {
            if (playerCanPlay(ss, action.sound)) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundPlayInterrupt: {
            if (playerCanPlayInterrupt(ss, action.sound)) {
                ss.soundPlayer.stop();
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundLoad: {
            ss.soundPlayer = loadSoundTheme(process.env.NEXT_PUBLIC_BASE_PATH + action.file);
            ss.disabled = action.disabled;
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundSet: {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundDisable: {
            ss.disabled = action.disabled;
            break;
        }
    }
    return ss;
};


export function PlatinumSoundManagerProvider({children}) {
    const [sound, soundDispatch] = React.useReducer(PlatinumSoundStateEventReducer, initialPlayer);

    return (
        <PlatinumSoundManagerContext.Provider value={sound}>
            <PlatinumSoundDispatchContext.Provider value={soundDispatch}>
                {children}
            </PlatinumSoundDispatchContext.Provider>
        </PlatinumSoundManagerContext.Provider>
    );
}
