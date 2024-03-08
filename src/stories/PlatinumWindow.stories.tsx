import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumWindow.css';

const meta = {
    title: 'Example/PlatinumWindow',
    component: PlatinumWindow,
    parameters: {
        layout: 'centered',
        title: "Document 1"
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "PlatinumWindowDemo",
        icon: "/img/icons/document.png"
    },
};
