import { FC, memo } from 'react';
import { Switch } from '@headlessui/react'

interface Props {
    forSetting?: string;
    theme: "primary" | "secondary" | "danger" | "success";
    enabled: boolean;
    setEnabled: () => void;
}

const ToggleSwitch: FC<Props> = ({
    forSetting,
    theme,
    enabled,
    setEnabled
}) => {


    const themeClasses = {
        primary: "bg-primary-medium",
        secondary: "bg-secondary-medium",
        danger: "bg-danger-medium",
        success: "bg-success-medium"
    }

    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4">{forSetting}</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? themeClasses[theme] : 'bg-gray-200'}
                    relative inline-flex items-center h-4.5 rounded-full w-8.5 transition-colors duration-500 focus:outline-none`}
                >
                    <span className="sr-only">{forSetting}</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-4 bg-white' : ('translate-x-0 ' + themeClasses[theme])}
                        inline-block w-4 h-4 transform rounded-full transition-transform duration-500`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
};

ToggleSwitch.defaultProps = {
    theme: "primary"
};

export default memo(ToggleSwitch);