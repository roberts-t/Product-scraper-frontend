import React, { useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';

export const InfoTooltip: React.FC<IInfoTooltipProps> = (props) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <BsQuestionCircleFill
                className="text-slate-600"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            <div className={`bg-slate-700 w-60 text-white py-1.5 px-3 rounded text-sm absolute left-1/2 transform -translate-x-1/2 top-5 shadow transition ${showTooltip ? 'opacity-95' : 'opacity-0 pointer-events-none'}`}>
                {props.text}
            </div>
        </div>
    );
};

interface IInfoTooltipProps {
    text: string;
}