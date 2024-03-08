import PlatinumDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/PlatinumDisclosure";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumDisclosure.css';

const meta = {
    title: 'Example/PlatinumDisclosure',
    component: PlatinumDisclosure,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumDisclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
         label: "OPEN THIS DISCLOSURE AREA",
        direction: "right",
        children: <span>EXPANDED</span>
    },
};
