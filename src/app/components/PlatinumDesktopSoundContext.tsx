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
    type: "play" | "load" | "set";
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: Howl | any;
}

export const initialPlayer: Howl = {
    soundPlayer: loadSoundTheme("/sounds/platinum.json"),
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
    switch (action.type.replace("PlatinumSound", "").toLowerCase()) {
        case "stop": {
            ss.soundPlayer.stop();
            break;
        }
        case "play": {
            if (!ss.soundPlayer.playing() && !(ss.disabled.includes(action.sound))) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case "load": {
            ss.soundPlayer = loadSoundTheme(action.file);
            ss.disabled = action.disabled;
            break;
        }
        case "set": {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
    }
    return ss;
};
