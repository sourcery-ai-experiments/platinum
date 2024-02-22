'use client';

import React from "react";
import Demo from "./applications/Demo";
import TextEdit from "./applications/TextEdit";

import AppearanceManager from "./components/ControlPanels/AppearanceManager";
import PlatinumDesktop from "./components/Desktop/PlatinumDesktop";
import {PlatinumDesktopProvider} from "./components/Desktop/PlatinumDesktopAppManagerContext";

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
