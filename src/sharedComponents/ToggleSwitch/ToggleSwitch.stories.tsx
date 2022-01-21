import React from 'react';

import { Meta } from '@storybook/react';

import '../../index.css';
import ToggleSwitch from './ToggleSwitch';

export const Toggle_Switch = (args: any) => (
    <ToggleSwitch {...args}></ToggleSwitch>
);

export default {
    title: 'Components/Toggle Switch',
    component: Toggle_Switch,
    args: {
        forSetting: "Show Password",
        enabled: false,
        setEnabled: () => {}
    }
} as Meta;