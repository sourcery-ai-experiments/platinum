import PlatinumTextEditor from "@/app/SystemFolder/SystemResources/TextEditor/PlatinumTextEditor";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumTextEditor.css';

const meta = {
    title: 'Example/PlatinumTextEditor',
    component: PlatinumTextEditor,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        content: "Lorem ipsum dolor sit amet"
    },
};
