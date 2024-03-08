import PlatinumContextualMenu from "@/app/SystemFolder/SystemResources/ContextualMenu/PlatinumContextualMenu";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumContextualMenu.css';

const meta = {
    title: 'Example/PlatinumContextualMenu',
    component: PlatinumContextualMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumContextualMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        position: [0, 0],
        menuItems: [{
            id: "file",
            title: "File",
            menuChildren: [
                {
                    id: "_connect",
                    title: "Connect",
                    keyboardShortcut: "&#8984;A",
                    icon: "/img/icons/internet-services.png"
                },
                {
                    id: "spacer",
                },
                {
                    id: "_quit",
                    title: "Quit",
                    keyboardShortcut: "&#8984;Q"
                }]
        },
            {
                id: "edit",
                title: "Edit",
                menuChildren: [
                    {
                        id: "_copy",
                        title: "Copy",
                        keyboardShortcut: "&#8984;C"
                    }
                ]
            }],
    },
};
