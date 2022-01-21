import React from 'react';

import { Meta } from '@storybook/react';

import EditInput from './EditInput';
import '../../index.css';

export const Edit_Input = (args: any) => (
    <EditInput {...args}></EditInput>
);

export default {
    title: 'Components/Input',
    component: Edit_Input,
    args: {
        placeholder: "username",
        name: "username",
        type: "string",
        touched: false,
        errorMessage: "Username is required",
        label: "Username"
    }
} as Meta;