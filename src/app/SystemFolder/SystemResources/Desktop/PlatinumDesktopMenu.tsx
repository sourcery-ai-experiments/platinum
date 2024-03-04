'use client';
import {
    useDesktop,
    useDesktopDispatch
} from '@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext';
import platinumDesktopMenuStyles from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenu.module.scss";
import PlatinumDesktopMenuWidgetTime from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenuWidgetTime";
import PlatinumMenu, {PlatinumMenuItem} from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import React from "react";


const PlatinumDesktopMenu: React.FC = () => {
    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const systemMenuItem: PlatinumMenuItem = {
        id: "apple-menu",
        image: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/apple.png`,
        menuChildren: desktopContext.systemMenu,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppleMenu
    };

    const setActiveApp = (appId: string) => {
        desktopEventDispatch({
            type: "PlatinumAppFocus",
            app: {id: appId},
        })
    };

    let activeAppObject = desktopContext.openApps.filter((app) => app.id == desktopContext.activeApp);
    if (!activeAppObject.length) {
        activeAppObject = [{icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/macos.svg`, name: "Finder"}];
    }

    const appSwitcherMenuMenuItem: PlatinumMenuItem = {
        id: "app-switcher",
        image: activeAppObject[0].icon,
        title: activeAppObject[0].name,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppSwitcher,
        menuChildren: desktopContext.openApps.map((app) => ({
                id: app.id,
                icon: app.icon,
                title: app.name,
                onClickFunc: () => {
                    setActiveApp(app.id)
                }
            }
        ))
    }

    const defaultMenuItems = [].concat(
        systemMenuItem,
        desktopContext.menuBar,
        appSwitcherMenuMenuItem,
    ) as PlatinumMenuItem[];

    return (
        <nav className={platinumDesktopMenuStyles.platinumDesktopMenuBar}>
            <PlatinumMenu menuItems={defaultMenuItems} navClass={platinumDesktopMenuStyles.platinumDesktopMenu}
                          subNavClass={platinumMenuStyles.platinumSubMenu}>
                <PlatinumDesktopMenuWidgetTime></PlatinumDesktopMenuWidgetTime>
            </PlatinumMenu>
        </nav>
    );
};

export default PlatinumDesktopMenu;

