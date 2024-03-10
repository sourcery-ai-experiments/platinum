import PlatinumInput from "@/app/SystemFolder/SystemResources/Input/PlatinumInput";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/PlatinumInput',
    component: PlatinumInput,
    parameters: {
        layout: 'centered',
        label: "OK"
    },
    argTypes: {
        onChangeFunc: {table: {disable: true}},
        id: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "test",
        inputType: "text",
        labelTitle: "Text Input",
        placeholder: "Placeholder Text",
    },
};
