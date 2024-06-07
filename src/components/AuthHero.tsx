import { useEffect } from 'react';
import { FC, memo } from 'react';
import AuthHeroImg from '../images/tutorsage.png';

interface Props {
    className?: string;
}

const AuthHero: FC<Props> = ({ className }) => {
    console.log("AuthHero rendering");
    useEffect(() => {
        console.log("AuthHero Rendering for the first time");
    }, []);
    return (
        <div className={`flex items-center h-full w-full text-white ${className}`}>
            <img className="mx-auto h-1.5x w-1.5x" src={AuthHeroImg} alt="Logo is here"></img>
        </div>
    );
};

AuthHero.defaultProps = {};

export default memo(AuthHero);