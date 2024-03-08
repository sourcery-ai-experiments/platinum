import PlatinumDropDown from "@/app/SystemFolder/SystemResources/DropDown/PlatinumDropDown";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumButton.css';

const meta = {
    title: 'Example/PlatinumDropDown',
    component: PlatinumDropDown,
    parameters: {
        layout: 'centered',
        label: "OK",

    },
    argTypes: {
        id: {table: {disable: true}},
        onChangeFunc: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
    {
        value: "test1",
        label: "Test 1"
    },
    {
        value: "test2",
        label: "Test 2"
    },
    {
        value: "test3",
        label: "Test 3"
    }

]

export const Primary: Story = {
    args: {
        id: "test",
        label: "Test",
        options: defaultOptions
    },
};
export const Small: Story = {
    args: {
        id: "test",
        label: "Test",
        small: true,
        options: defaultOptions
    },
};
