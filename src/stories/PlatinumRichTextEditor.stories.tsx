import PlatinumRichTextEditor from "@/app/SystemFolder/SystemResources/RichTextEditor/PlatinumRichTextEditor";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumRichTextEditor.css';

const meta = {
    title: 'Example/PlatinumRichTextEditor',
    component: PlatinumRichTextEditor,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumRichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        content: "Lorem ipsum dolor sit amet"
    },
};
