'use client';

import * as React from "react";

import AppearanceManager from "./applications/AppearanceManager";
import Demo from "./applications/Demo";
import TextEdit from "./applications/TextEdit";
import PlatinumDesktop from "./components/desktop/PlatinumDesktop";
import {PlatinumDesktopProvider} from "./components/desktop/PlatinumDesktopAppManagerContext";

export default function Home() {
    return (
        <PlatinumDesktopProvider>
            <PlatinumDesktop>
                <AppearanceManager/>
                <Demo/>
                <TextEdit/>
            </PlatinumDesktop>
        </PlatinumDesktopProvider>
    );
}
