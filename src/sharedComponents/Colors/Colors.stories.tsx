import React from 'react';

import { Meta } from '@storybook/react';

import '../../index.css';

export const Colors = (args: any) => (
    <div className="flex flex-col">
        <div className="flex flex-row w-full h-28">
            <span className="flex bg-primary-extra-dark w-full text-white items-center justify-center">Primary Extra Dark</span>
            <span className="flex bg-primary-dark w-full text-white items-center justify-center">Primary Dark</span>
            <span className="flex bg-primary-medium w-full text-white items-center justify-center">Primary Medium</span>
            <span className="flex bg-primary-light w-full text-white items-center justify-center">Primary Light</span>
            <span className="flex bg-primary-extra-light w-full text-white items-center justify-center">Primary Extra Light</span>
        </div>

        <div className="mt-10 flex flex-row w-full h-28">
            <span className="flex bg-secondary-extra-dark w-full items-center justify-center">Secondary Extra Dark</span>
            <span className="flex bg-secondary-dark w-full items-center justify-center">Secondary Dark</span>
            <span className="flex bg-secondary-medium w-full items-center justify-center">Secondary Medium</span>
            <span className="flex bg-secondary-light w-full items-center justify-center">Secondary Light</span>
            <span className="flex bg-secondary-extra-light w-full items-center justify-center">Secondary Extra Light</span>
        </div>

        <div className="mt-10 flex flex-row w-full h-28">
            <span className="flex bg-danger-extra-dark w-full items-center justify-center">Danger Extra Dark</span>
            <span className="flex bg-danger-dark w-full items-center justify-center">Danger Dark</span>
            <span className="flex bg-danger-medium w-full items-center justify-center">Danger Medium</span>
            <span className="flex bg-danger-light w-full items-center justify-center">Danger Light</span>
            <span className="flex bg-danger-extra-light w-full items-center justify-center">Danger Extra Light</span>
        </div>

        <div className="mt-10 flex flex-row w-full h-28">
            <span className="flex bg-success-extra-dark w-full items-center justify-center">Success Extra Dark</span>
            <span className="flex bg-success-dark w-full items-center justify-center">Success Dark</span>
            <span className="flex bg-success-medium w-full items-center justify-center">Success Medium</span>
            <span className="flex bg-success-light w-full items-center justify-center">Success Light</span>
            <span className="flex bg-success-extra-light w-full items-center justify-center">Success Extra Light</span>
        </div>

        <div className="flex flex-row mt-10 mx-auto w-1/4 h-28">
            <span className={`flex w-1/2 items-center justify-center ${args.box1}`}>Box 1</span>
            <span className={`flex w-1/2 items-center justify-center ${args.box2}`}>Box 2</span>
        </div>

        <div className={`flex items-center justify-center mt-10 mx-auto w-1/12 h-28 ${args.outerBox}`}>
            <div className={`w-1/2 h-14 ${args.innerBox}`}></div>
        </div>
    </div>
);

export default {
    title: 'Components/Colors',
    component: Colors,
    args: {
        box1: "bg-primary-dark text-white",
        box2: "bg-secondary-dark text-white",
        outerBox: "bg-primary-medium",
        innerBox: "bg-secondary-medium"
    }
} as Meta;