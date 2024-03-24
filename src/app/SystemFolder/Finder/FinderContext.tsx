import {DefaultPlatinumFinderState, PlatinumFinderContextData} from "@/app/SystemFolder/Finder/FinderState";
import React from 'react';

export const PlatinumFinderContext = React.createContext(DefaultPlatinumFinderState);
export const PlatinumFinderDispatchContext = React.createContext(null);

type PlatinumFinderProviderProps = {
    children?: any
}

export const PlatinumFinderProvider: React.FC<PlatinumFinderProviderProps> = ({children}) => {
    let finderState = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('platinumFinderState')) || DefaultPlatinumFinderState
        : DefaultPlatinumFinderState;

    const [finder, dispatch] = React.useReducer(platinumFinderEventHandler, finderState);

    React.useEffect(() => {
        localStorage.setItem('platinumFinderState', JSON.stringify(finder));
    }, [finder])

    return (
        <PlatinumFinderContext.Provider value={finder}>
            <PlatinumFinderDispatchContext.Provider value={dispatch}>
                {children}
            </PlatinumFinderDispatchContext.Provider>
        </PlatinumFinderContext.Provider>
    );
}


export function useFinder() {
    return React.useContext(PlatinumFinderContext);
}

export function useFinderDispatch() {
    return React.useContext(PlatinumFinderDispatchContext);
}

export const platinumFinderEventHandler = (ds: PlatinumFinderContextData, action) => {
    switch (action.type) {
        case "PlatinumFinderEmptyTrash": {
            console.log("EMPTYING TRASH")
            break;
        }
        case "PlatinumFinderOpenDirectory": {
            ds.openPaths = [...ds.openPaths, action.path];
            break;
        }
    }
    return ds;
};
