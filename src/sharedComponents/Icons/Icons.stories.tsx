import { Meta } from '@storybook/react';

import Icon from './Icons';
import '../../index.css';

const names = ["username", "password", "email", "cross", "list", "logo", "dashboard", "user"]//, "graph"

export const Icons = (args: any) => (
    <Icon {...args}></Icon>
);

export default {
    title: 'Components/Icons',
    component: Icon,
    argTypes: {
        name: {
            options: names,
            control: {
                type: "radio"
            }
        }
    },
    args: {
        name: "username",
        className: "",
        theme: "primary",
    }
} as Meta;