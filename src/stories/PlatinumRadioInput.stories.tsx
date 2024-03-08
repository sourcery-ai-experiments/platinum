import PlatinumRadioInput from "@/app/SystemFolder/SystemResources/RadioInput/PlatinumRadioInput";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumButton.css';

const meta = {
    title: 'Example/PlatinumRadioInput',
    component: PlatinumRadioInput,
    parameters: {
        layout: 'centered',
        label: "OK",
    },
    argTypes: {
        onClick: {table: {disable: true}},
        checked: {table: {disable: true}},
        id: {table: {disable: true}},
        name: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumRadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "testRadio",
        name: "radio_input_test",
        label: "Radio Input",
    },
};
