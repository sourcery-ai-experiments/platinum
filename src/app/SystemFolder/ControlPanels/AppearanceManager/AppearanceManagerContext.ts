import {createContext} from 'react';

export const defaultAppearanceManagerContext = {elements: {}, windows: {}};
const AppearanceManagerContext = createContext({
    appContext: defaultAppearanceManagerContext,
    setAppContext: (ctx) => {
    }
});

export default AppearanceManagerContext;
