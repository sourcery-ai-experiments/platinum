import PlatinumProgressBar from "@/app/SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumProgressBar.css';

const meta = {
    title: 'Example/PlatinumProgressBar',
    component: PlatinumProgressBar,
    parameters: {
        layout: 'padding',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlatinumProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        max: 100,
        value: 50
    },
};
