import PlatinumInputGroup from "@/app/SystemFolder/SystemResources/InputGroup/PlatinumInputGroup";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumInputGroup.css';

const meta = {
    title: 'Example/PlatinumInputGroup',
    component: PlatinumInputGroup,
    parameters: {
        layout: 'padding',
        label: "OK"
    },
    argTypes: {
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "Label",
        columns: false,
        children: <div><p>Components go here</p> <p>Components go here</p></div>
    },
};
