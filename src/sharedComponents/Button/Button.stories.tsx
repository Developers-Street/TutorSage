import React from 'react';

import { Meta } from '@storybook/react';

import Button from './Button';
import '../../index.css';

export const Buttons = (args: any) => (
    <div className={`${args.widthOfContainer}`}>
        <Button buttonDisabled={args.buttonDisabled} text={args.text} buttonSize={args.buttonSize} theme={args.theme} buttonStyle={args.buttonStyle} className={args.className} ></Button>
    </div>
);

export default {
    title: 'Components/Buttons',
    component: Button,
    args: {
        buttonDisabled: false,
        text: "Click Me!",
        buttonSize: "lg",
        theme: "primary",
        buttonStyle: "solid",
        className: "",
        widthOfContainer: "w-1/6"
    }
} as Meta;