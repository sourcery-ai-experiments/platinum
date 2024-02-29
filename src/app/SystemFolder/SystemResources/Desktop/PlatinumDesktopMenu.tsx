'use client';
import {useDesktop} from '@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopAppManagerContext';
import platinumDesktopMenuStyles from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenu.module.scss";
import PlatinumDesktopMenuWidgetTime from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenuWidgetTime";
import PlatinumMenu, {PlatinumMenuItem} from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import React from "react";

interface PlatinumMenuProps {
    menuItems: PlatinumMenuItem[];
}

const PlatinumDesktopMenu: React.FC<PlatinumMenuProps> = ({menuItems}) => {
    const desktopContext = useDesktop();

    const systemMenuItem: PlatinumMenuItem = {
        id: "apple-menu",
        image: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/apple.png`,
        menuChildren: desktopContext.systemMenu,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppleMenu
    };

    const appSwitcherMenuMenuItem: PlatinumMenuItem = {
        id: "app-switcher",
        image: desktopContext.appSwitcherMenu[0].icon,
        title: desktopContext.appSwitcherMenu[0].name,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppSwitcher,
        menuChildren: desktopContext.openApps.map((app) => ({
                id: app.id,
                icon: app.icon,
                title: app.name
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

