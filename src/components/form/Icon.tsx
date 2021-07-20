import { FC, memo } from 'react';

interface Props {
    children?: React.ReactElement;
}

const Icon: FC<Props> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 stroke-primary-dark fill-primary-light" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {props.children}
        </svg>
    );
};

Icon.defaultProps = {};

export default memo(Icon);