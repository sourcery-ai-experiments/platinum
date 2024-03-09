import PlatinumControlGroup from "@/app/SystemFolder/SystemResources/ControlGroup/PlatinumControlGroup";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumControlGroup.css';

const meta = {
    title: 'Example/PlatinumControlGroup',
    component: PlatinumControlGroup,
    decorators: [
        (Story) => (
            <div style={{padding: '1em'}}>
                <Story/>
            </div>
        ),
    ],
    parameters: {
        layout: 'padding',
    },
    argTypes: {
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumControlGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "Label",
        columns: false,
        children: [<p>Components go here</p>, <p>Components go here</p>]
    },
};
