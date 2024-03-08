import PlatinumCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/PlatinumCheckbox";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumButton.css';

const meta = {
    title: 'Example/PlatinumCheckbox',
    component: PlatinumCheckbox,
    parameters: {
        layout: 'centered',
        label: "Button"
    },
    argTypes: {
        onClick: {table: {disable: true}},
        id: {table: {disable: true}},
        name: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "test_checkbox",
        name: "test_checkbox",
        checked: false,
        label: "Checkbox"
    },
};
