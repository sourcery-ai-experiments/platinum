'use client';
import * as React from "react";
import {useDesktop} from './PlatinumDesktopContext';
import platinumDesktopMenuStyles from "./PlatinumDesktopMenu.module.scss";
import PlatinumMenu, {PlatinumMenuItem} from "./PlatinumMenu";
import platinumMenuStyles from "./PlatinumMenu.module.scss";

interface PlatinumMenuProps {
    menuItems: PlatinumMenuItem[];
}

const PlatinumDesktopMenu: React.FC<PlatinumMenuProps> = ({menuItems}) => {
    const desktopContext = useDesktop();

    const systemMenuItem: PlatinumMenuItem = {
        id: "apple-menu",
        image: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/apple.png`,
        menuChildren: desktopContext.systemMenu,
        className: platinumMenuStyles.platinumDesktopMenuAppleMenu
    };

    const timeMenuItemPlaceholder: PlatinumMenuItem = {
        id: "time",
        title: "8:32 PM",
        className: platinumDesktopMenuStyles.platinumDesktopMenuTime,
    }

    const a = desktopContext.appSwitcherMenu[0];

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
        timeMenuItemPlaceholder
    ) as PlatinumMenuItem[];

    return (
        <nav className={platinumDesktopMenuStyles.platinumDesktopMenuBar}>
            <PlatinumMenu menuItems={defaultMenuItems} navClass={platinumDesktopMenuStyles.platinumDesktopMenu}
                          subNavClass={platinumMenuStyles.platinumSubMenu}
            ></PlatinumMenu>
        </nav>
    );
};

export default PlatinumDesktopMenu;

