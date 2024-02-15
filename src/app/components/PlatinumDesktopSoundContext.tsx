import {Howl} from 'howler';
import {createContext, useContext} from 'react';
import {loadSoundTheme} from "./PlatinumAppearance";

export const PlatinumDesktopSoundContext = createContext(null);
export const PlatinumDesktopSoundDispatchContext = createContext(null);


interface PlatinumDesktopSoundState {
    soundPlayer: Howl;
}

interface PlatinumDesktopSoundAction {
    type: "play" | "load" | "set";
    file: string;
    soundPlayer: Howl | any;
}

export const initialPlayer = {
    soundPlayer: loadSoundTheme("/sounds/platinum.json"),
};

export function useSound() {
    return useContext(PlatinumDesktopSoundContext);
}

export function useSoundDispatch() {
    return useContext(PlatinumDesktopSoundDispatchContext);
}

export const PlatinumDesktopSoundStateEventReducer = (ss: PlatinumDesktopSoundState, action) => {
    if ('type' in action) {
        switch (action.type.replace("PlatinumSound", "").toLowerCase()) {
            case "play": {
                ss.soundPlayer.play(action.sound);
                break;
            }
            case "load": {
                ss.soundPlayer = loadSoundTheme(action.file);
                break;
            }
            case "set": {
                ss.soundPlayer = action.soundPlayer;
                break;
            }
        }
    }
    return ss;
};
