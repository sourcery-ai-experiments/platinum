import PlatinumButton from "@/app/SystemFolder/SystemResources/Button/PlatinumButton";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumButton.css';

const meta = {
    title: 'Example/PlatinumButton',
    component: PlatinumButton,
    parameters: {
        layout: 'centered',
        label: "Button"
    },
    argTypes: {
        onClick: {table: {disable: true}},
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isDefault: false,
        children: <span>{meta.parameters.label}</span>
    },
};

export const Default: Story = {
    args: {
        isDefault: true,
        children: <span>Submit</span>
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: <span>Disabled</span>
    },
};
