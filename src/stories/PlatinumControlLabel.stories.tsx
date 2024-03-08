import PlatinumControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/PlatinumControlLabel";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumDisclosure.css';

const meta = {
    title: 'Example/PlatinumControlLabel',
    component: PlatinumControlLabel,
    parameters: {
        layout: 'centered',
    },    argTypes: {
        labelFor: {table: {disable: true}},
    },

    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        labelFor: "htmlid",
        label: "Control Label",
        disabled: false,
        direction: "left"
    },
};

export const Disabled: Story = {
    args: {
        labelFor: "htmlid",
        label: "Control Label",
        disabled: true,
        direction: "left"
    },
};
