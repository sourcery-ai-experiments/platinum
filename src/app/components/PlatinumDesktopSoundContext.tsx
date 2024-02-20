import {Howl} from 'howler';
import {createContext, useContext} from 'react';
import {loadSoundTheme} from "./PlatinumAppearance";

export const PlatinumDesktopSoundContext = createContext(null);
export const PlatinumDesktopSoundDispatchContext = createContext(null);


interface PlatinumDesktopSoundState {
    soundPlayer: Howl | null;
    disabled: string[];
}

interface PlatinumDesktopSoundAction {
    type: "PlatinumSoundStop" | "PlatinumSoundPlay" | "PlatinumSoundLoad" | "PlatinumSoundSet";
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: Howl | any;
}

export const initialPlayer: Howl = {
    soundPlayer: loadSoundTheme("/sounds/platinum/platinum.json"),
    disabled: []
};

export function useSound() {
    return useContext(PlatinumDesktopSoundContext);
}

export function useSoundDispatch() {
    return useContext(PlatinumDesktopSoundDispatchContext);
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
        case "PlatinumSoundLoad": {
            ss.soundPlayer = loadSoundTheme(action.file);
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
