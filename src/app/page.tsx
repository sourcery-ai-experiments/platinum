'use client';

import * as React from "react";
import AppearanceManager from "./applications/AppearanceManager";
import Demo from "./applications/Demo";
import TextEdit from "./applications/TextEdit";

import PlatinumDesktop from "./components/PlatinumDesktop";
import {PlatinumDesktopProvider} from "./components/PlatinumDesktopContext";

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
